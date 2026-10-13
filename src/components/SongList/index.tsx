import React, { useMemo } from 'react';
import {
  closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Song } from "../../Services/interfaces";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { playSongs, selectCurrentSong, togglePlaying } from "../../redux/reducers/PlayerReducer";
import { artistNames, decodeEntities, formatTime, pickImage } from "../../utils/format";
import { LikeButton } from "../LikeButton";
import { ArtistLinks } from "../ArtistCard";
import { SongMenuButton } from "../SongMenu";
import './styles.scss';

interface SongListProps {
  songs: Song[],
  // "index" shows track numbers instead of artwork (album pages).
  variant?: 'art' | 'index',
  // Overrides the default "play this list from here" behaviour.
  onPlay?: (index: number) => void,
  // Adds a context action to each row's menu (queue, playlists).
  onRemove?: (index: number) => void,
  removeLabel?: string,
  // Enables drag-to-reorder with a handle on each row.
  onReorder?: (from: number, to: number) => void,
  // Index into `songs` that is currently playing, when the list *is* the queue.
  activeIndex?: number,
}

interface RowProps {
  song: Song,
  index: number,
  variant: 'art' | 'index',
  isActive: boolean,
  isPlaying: boolean,
  onPlay: () => void,
  onRemove?: () => void,
  removeLabel?: string,
  sortableId?: string,
}

// Songs can repeat in a queue, so ids are made unique per occurrence.
const sortableIds = (songs: Song[]) => {
  const seen = new Map<string, number>();
  return songs.map((song) => {
    const count = seen.get(song.id) ?? 0;
    seen.set(song.id, count + 1);
    return `${song.id}#${count}`;
  });
};

const SongRow = ({ song, index, variant, isActive, isPlaying, onPlay, onRemove, removeLabel, sortableId }: RowProps) => {
  const sortable = useSortable({ id: sortableId ?? '', disabled: !sortableId });
  const name = decodeEntities(song.name);
  const artists = artistNames(song.artists);
  const style = sortableId ? {
    transform: CSS.Translate.toString(sortable.transform),
    transition: sortable.transition,
  } : undefined;

  return (
    <li ref={sortableId ? sortable.setNodeRef : undefined} style={style}
        className={[
          'song-row',
          isActive && 'song-row--active',
          isActive && isPlaying && 'song-row--playing',
          sortable.isDragging && 'song-row--dragging',
        ].filter(Boolean).join(' ')}>
      {/* Full-row hit area; artist links and actions sit above it. */}
      <button className='song-row__hit' onClick={onPlay}
              aria-label={`${isActive && isPlaying ? 'Pause' : 'Play'} ${name} by ${artists}`} />
      {sortableId && (
        <button className='song-row__handle' ref={sortable.setActivatorNodeRef}
                {...sortable.attributes} {...sortable.listeners}
                aria-label={`Reorder ${name}. Press space to pick up, arrow keys to move.`}>
          <i className='fa-solid fa-grip-vertical' />
        </button>
      )}
      <span className={`song-row__lead song-row__lead--${variant}`} aria-hidden='true'>
        {variant === 'art'
          ? <img src={pickImage(song.image, 'small')} alt='' loading='lazy' width={44} height={44} />
          : <span className='song-row__number'>{index + 1}</span>}
        <span className='song-row__overlay'>
          {isActive && isPlaying
            ? <span className='equalizer'><span /><span /><span /></span>
            : <i className='fa-solid fa-play' />}
        </span>
      </span>
      <span className='song-row__text'>
        <span className='song-row__name' title={name}>
          {song.explicitContent && <span className='song-row__explicit' title='Explicit'>E</span>}
          {name}
        </span>
        <ArtistLinks artists={song.artists} className='song-row__artists' />
      </span>
      <div className='song-row__actions'>
        <LikeButton song={song} className='song-row__action song-row__action--like' />
        <span className='song-row__duration'>{formatTime(song.duration)}</span>
        <SongMenuButton song={song} className='song-row__action song-row__action--menu'
                        extra={onRemove ? { remove: { label: removeLabel ?? 'Remove', onSelect: onRemove } } : undefined} />
      </div>
    </li>
  );
};

export const SongList = ({
  songs, variant = 'art', onPlay, onRemove, removeLabel, onReorder, activeIndex,
}: SongListProps) => {
  const dispatch = useAppDispatch();
  const current = useAppSelector(selectCurrentSong);
  const isPlaying = useAppSelector((state) => state.player.isPlaying);
  const ids = useMemo(() => sortableIds(songs), [songs]);
  const sensors = useSensors(
    // A small distance keeps taps and clicks working on the handle.
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const isActiveAt = (index: number) =>
    activeIndex !== undefined ? activeIndex === index : current?.id === songs[index].id;

  const handlePlay = (index: number) => {
    if (isActiveAt(index)) {
      dispatch(togglePlaying());
    } else if (onPlay) {
      onPlay(index);
    } else {
      dispatch(playSongs(songs, index));
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id || !onReorder) return;
    onReorder(ids.indexOf(String(active.id)), ids.indexOf(String(over.id)));
  };

  const list = (
    <ol className={`song-list ${onReorder ? 'song-list--sortable' : ''}`}>
      {songs.map((song, index) => (
        <SongRow key={ids[index]} song={song} index={index} variant={variant}
                 isActive={isActiveAt(index)} isPlaying={isPlaying}
                 onPlay={() => handlePlay(index)}
                 onRemove={onRemove ? () => onRemove(index) : undefined} removeLabel={removeLabel}
                 sortableId={onReorder ? ids[index] : undefined} />
      ))}
    </ol>
  );

  if (!onReorder) return list;
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} modifiers={[restrictToVerticalAxis]}
                onDragEnd={handleDragEnd}>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        {list}
      </SortableContext>
    </DndContext>
  );
};

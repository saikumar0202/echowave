import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { loadArtist } from "../../redux/reducers/ArtistReducer";
import { playSongs } from "../../redux/reducers/PlayerReducer";
import { BackButton } from "../../components/BackButton";
import { SongList } from "../../components/SongList";
import { AlbumCard } from "../../components/AlbumCard";
import { ArtistCard } from "../../components/ArtistCard";
import { PlayAllButton, Section } from "../../components/Section";
import { ApiError, SongListSkeleton } from "../../components/Status";
import { compactNumber, decodeEntities } from "../../utils/format";
import "../views.scss";
import { Artwork } from "../../components/Artwork";

const TOP_SONGS_PREVIEW = 5;

export const ArtistPage = () => {
  const { id = '' } = useParams();
  const dispatch = useAppDispatch();
  const { artist, status } = useAppSelector((state) => state.artist);
  const [showAllSongs, setShowAllSongs] = useState(false);
  const [showBio, setShowBio] = useState(false);

  useEffect(() => {
    setShowAllSongs(false);
    setShowBio(false);
    dispatch(loadArtist(id));
  }, [id, dispatch]);

  const topSongs = artist?.topSongs ?? [];
  const bio = decodeEntities(artist?.bio?.find((entry) => entry.text)?.text);

  return (
    <div className='view'>
      <BackButton />

      {status === 'error' && <ApiError onRetry={() => dispatch(loadArtist(id))} />}
      {status === 'loading' && (
        <>
          <div className='collection-hero'>
            <div className='collection-hero__art collection-hero__art--round skeleton' />
            <div className='collection-hero__text'>
              <span className='skeleton skeleton--line' />
              <span className='skeleton skeleton--line skeleton--short' />
            </div>
          </div>
          <SongListSkeleton rows={5} />
        </>
      )}
      {status === 'ready' && artist && (
        <>
          <header className='collection-hero'>
            <Artwork className='collection-hero__art collection-hero__art--round' images={artist.image} size='large' />
            <div className='collection-hero__text'>
              <p className='view__eyebrow'>
                {artist.isVerified && <><i className='fa-solid fa-circle-check verified' aria-hidden='true' /> Verified </>}
                Artist
              </p>
              <h1 className='view__title'>{decodeEntities(artist.name)}</h1>
              {artist.followerCount ? (
                <p className='collection-hero__meta'>{compactNumber(artist.followerCount)} followers</p>
              ) : null}
              {topSongs.length > 0 && (
                <div className='collection-hero__actions'>
                  <PlayAllButton onClick={() => dispatch(playSongs(topSongs))} label='Play' />
                </div>
              )}
            </div>
          </header>

          {topSongs.length > 0 && (
            <Section title='Popular'
                     action={topSongs.length > TOP_SONGS_PREVIEW && (
                       <button className='text-button' onClick={() => setShowAllSongs((value) => !value)}>
                         {showAllSongs ? 'Show less' : 'Show all'}
                       </button>
                     )}>
              <SongList songs={showAllSongs ? topSongs : topSongs.slice(0, TOP_SONGS_PREVIEW)}
                        variant='index' onPlay={(index) => dispatch(playSongs(topSongs, index))} />
            </Section>
          )}

          {(artist.topAlbums?.length ?? 0) > 0 && (
            <Section title='Albums'>
              <ul className='album-grid'>
                {artist.topAlbums!.map((album) => <AlbumCard key={album.id} album={album} />)}
              </ul>
            </Section>
          )}

          {(artist.similarArtists?.length ?? 0) > 0 && (
            <Section title='Fans also like'>
              <ul className='artist-row'>
                {artist.similarArtists!.map((similar) => <ArtistCard key={similar.id} artist={similar} />)}
              </ul>
            </Section>
          )}

          {bio && (
            <Section title='About'>
              <p className={`artist-bio ${showBio ? 'artist-bio--open' : ''}`}>{bio}</p>
              <button className='text-button' onClick={() => setShowBio((value) => !value)}>
                {showBio ? 'Show less' : 'Read more'}
              </button>
            </Section>
          )}
        </>
      )}
    </div>
  );
};

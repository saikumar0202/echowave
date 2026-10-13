import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { loadDiscover, loadTeluguHits } from "../../redux/reducers/CatalogReducer";
import { youtubeEnabled } from "../../Services/youtube";
import { playSongs, selectCurrentSong } from "../../redux/reducers/PlayerReducer";
import { AlbumCard } from "../../components/AlbumCard";
import { SongList } from "../../components/SongList";
import { PlayAllButton, Section } from "../../components/Section";
import { AlbumGridSkeleton, ApiError, SongListSkeleton } from "../../components/Status";
import { decodeEntities, greeting } from "../../utils/format";
import "../views.scss";

const TRENDING_PREVIEW = 10;

export const Discover = () => {
  const dispatch = useAppDispatch();
  const { trending, topAlbums, status, suggestions, suggestionsStatus, teluguHits, teluguStatus } = useAppSelector((state) => state.catalog);
  const current = useAppSelector(selectCurrentSong);

  useEffect(() => {
    if (status === 'idle') dispatch(loadDiscover());
  }, [status, dispatch]);

  useEffect(() => {
    if (youtubeEnabled()) dispatch(loadTeluguHits());
  }, [dispatch]);

  const loading = status === 'idle' || status === 'loading';

  return (
    <div className='view'>
      <header className='view__hero'>
        <p className='view__eyebrow'>{greeting()}</p>
        <h1 className='view__title'>Discover new music</h1>
      </header>

      {status === 'error' ? <ApiError onRetry={() => dispatch(loadDiscover())} /> : (
        <>
          <Section title='Top albums'>
            {loading ? <AlbumGridSkeleton /> : (
              <ul className='album-grid'>
                {topAlbums.map((album) => <AlbumCard key={album.id} album={album} />)}
              </ul>
            )}
          </Section>

          {youtubeEnabled() && teluguStatus !== 'error' && (
            <Section title='Telugu hits' subtitle='From YouTube'
                     action={teluguHits.length > 0 && <PlayAllButton onClick={() => dispatch(playSongs(teluguHits))} />}>
              {teluguStatus === 'ready' ? <SongList songs={teluguHits.slice(0, TRENDING_PREVIEW)} /> : <SongListSkeleton rows={4} />}
            </Section>
          )}

          {(suggestions.length > 0 || suggestionsStatus === 'loading') && current && (
            <Section title='You may like' subtitle={`Because you're listening to ${decodeEntities(current.name)}`}
                     action={suggestions.length > 0 && <PlayAllButton onClick={() => dispatch(playSongs(suggestions))} />}>
              {suggestionsStatus === 'loading' && suggestions.length === 0
                ? <SongListSkeleton rows={4} />
                : <SongList songs={suggestions} />}
            </Section>
          )}

          <Section title='Trending now'
                   action={!loading && trending.length > 0 && <PlayAllButton onClick={() => dispatch(playSongs(trending))} />}>
            {loading ? <SongListSkeleton /> : <SongList songs={trending.slice(0, TRENDING_PREVIEW)} />}
          </Section>
        </>
      )}
    </div>
  );
};

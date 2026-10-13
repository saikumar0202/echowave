import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { clearSearch, runSearch, runYouTubeSearch } from "../../redux/reducers/SearchReducer";
import { youtubeEnabled } from "../../Services/youtube";
import { AlbumCard } from "../../components/AlbumCard";
import { ArtistCard } from "../../components/ArtistCard";
import { SongList } from "../../components/SongList";
import { Section } from "../../components/Section";
import { ApiError, SongListSkeleton, StatusMessage } from "../../components/Status";
import "../views.scss";

const DEBOUNCE_MS = 350;

type Source = 'audius' | 'youtube';

const AudiusResults = ({ query }: { query: string }) => {
  const dispatch = useAppDispatch();
  const { query: resultsQuery, songs, albums, artists, status } = useAppSelector((state) => state.search);
  const hasResults = songs.length > 0 || albums.length > 0 || artists.length > 0;

  useEffect(() => {
    if (!query) dispatch(clearSearch());
    else if (query !== resultsQuery) dispatch(runSearch(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, dispatch]);

  if (!query) {
    return (
      <StatusMessage icon='fa-solid fa-headphones' title='Find something to play'>
        Search for a song, album, or artist.
      </StatusMessage>
    );
  }
  if (status === 'error') return <ApiError onRetry={() => dispatch(runSearch(query))} />;
  if (status === 'loading' && !hasResults) return <SongListSkeleton />;
  if (status === 'ready' && !hasResults) {
    return (
      <StatusMessage icon='fa-solid fa-face-meh' title={`No results for “${query}”`}>
        Check the spelling, or try the Telugu &amp; Indian tab for film songs.
      </StatusMessage>
    );
  }
  return (
    <div className={status === 'loading' ? 'view__stale' : ''}>
      {artists.length > 0 && (
        <Section title='Artists'>
          <ul className='artist-row'>
            {artists.map((artist) => <ArtistCard key={artist.id} artist={artist} />)}
          </ul>
        </Section>
      )}
      {songs.length > 0 && (
        <Section title='Songs'>
          <SongList songs={songs} />
        </Section>
      )}
      {albums.length > 0 && (
        <Section title='Albums & playlists'>
          <ul className='album-grid'>
            {albums.map((album) => <AlbumCard key={album.id} album={album} />)}
          </ul>
        </Section>
      )}
    </div>
  );
};

const YouTubeResults = ({ query }: { query: string }) => {
  const dispatch = useAppDispatch();
  const { query: resultsQuery, songs, status, error } = useAppSelector((state) => state.search.youtube);

  useEffect(() => {
    if (query && youtubeEnabled() && query !== resultsQuery) dispatch(runYouTubeSearch(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, dispatch]);

  if (!youtubeEnabled()) {
    return (
      <StatusMessage icon='fa-brands fa-youtube' title='YouTube search isn’t set up'>
        Add a YouTube Data API key as <code>VITE_YOUTUBE_API_KEY</code> to search Telugu and Indian film songs.
      </StatusMessage>
    );
  }
  if (!query) {
    return (
      <StatusMessage icon='fa-brands fa-youtube' title='Telugu & Indian film songs'>
        Type a song or film name and press Enter. Songs play from official uploads on YouTube.
      </StatusMessage>
    );
  }
  if (status === 'error') {
    return error ? (
      <StatusMessage icon='fa-solid fa-hourglass-half' title='Search limit reached'>{error}</StatusMessage>
    ) : (
      <ApiError onRetry={() => dispatch(runYouTubeSearch(query))} />
    );
  }
  if (status === 'loading' && !songs.length) return <SongListSkeleton />;
  if (status === 'ready' && !songs.length) {
    return (
      <StatusMessage icon='fa-solid fa-face-meh' title={`No songs found for “${query}”`}>
        Try the film name, or the song name in English letters.
      </StatusMessage>
    );
  }
  return (
    <div className={status === 'loading' ? 'view__stale' : ''}>
      <Section title='Songs' subtitle='From YouTube'>
        <SongList songs={songs} />
      </Section>
    </div>
  );
};

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = (searchParams.get('q') ?? '').trim();
  const source: Source = searchParams.get('source') === 'youtube' ? 'youtube' : 'audius';
  const [text, setText] = useState(searchParams.get('q') ?? '');
  const inputRef = useRef<HTMLInputElement>(null);
  const trimmed = text.trim();

  const updateUrl = (query: string, nextSource: Source = source) => {
    const params: Record<string, string> = {};
    if (query) params.q = query;
    if (nextSource === 'youtube') params.source = 'youtube';
    setSearchParams(params, { replace: true });
  };

  useEffect(() => {
    // Phones would pop the keyboard over everything; only autofocus with a pointer.
    if (window.matchMedia('(hover: hover)').matches) inputRef.current?.focus();
  }, []);

  // On Audius, typing searches as you go (debounced, without piling up history
  // entries). YouTube searches cost quota, so they wait for Enter.
  useEffect(() => {
    if (source === 'youtube' || trimmed === urlQuery) return;
    const timer = window.setTimeout(() => updateUrl(trimmed), DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trimmed, urlQuery, source]);

  return (
    <div className='view'>
      <header className='view__hero view__hero--compact'>
        <h1 className='view__title'>Search</h1>
      </header>
      <form className='search-box' role='search' onSubmit={(event) => {
        event.preventDefault();
        updateUrl(trimmed);
        inputRef.current?.blur();
      }}>
        <i className='fa-solid fa-magnifying-glass' aria-hidden='true' />
        <input ref={inputRef} type='search' value={text}
               placeholder={source === 'youtube' ? 'Telugu song or film, then Enter' : 'Songs, albums, artists'}
               aria-label='Search songs, albums and artists' enterKeyHint='search'
               onChange={(event) => setText(event.target.value)} />
        {text && (
          <button type='button' className='search-box__clear' aria-label='Clear search'
                  onClick={() => {
                    setText('');
                    updateUrl('');
                    inputRef.current?.focus();
                  }}>
            <i className='fa-solid fa-circle-xmark' />
          </button>
        )}
      </form>

      <div className='source-tabs' role='tablist' aria-label='Music source'>
        <button role='tab' aria-selected={source === 'audius'} className={source === 'audius' ? 'is-active' : ''}
                onClick={() => updateUrl(trimmed, 'audius')}>
          <i className='fa-solid fa-music' aria-hidden='true' /> All music
        </button>
        <button role='tab' aria-selected={source === 'youtube'} className={source === 'youtube' ? 'is-active' : ''}
                onClick={() => updateUrl(trimmed, 'youtube')}>
          <i className='fa-brands fa-youtube' aria-hidden='true' /> Telugu &amp; Indian
        </button>
      </div>

      {source === 'youtube' ? <YouTubeResults query={urlQuery} /> : <AudiusResults query={urlQuery} />}
    </div>
  );
};

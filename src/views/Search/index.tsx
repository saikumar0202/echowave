import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { clearSearch, runSearch } from "../../redux/reducers/SearchReducer";
import { AlbumCard } from "../../components/AlbumCard";
import { ArtistCard } from "../../components/ArtistCard";
import { SongList } from "../../components/SongList";
import { Section } from "../../components/Section";
import { ApiError, SongListSkeleton, StatusMessage } from "../../components/Status";
import "../views.scss";

const DEBOUNCE_MS = 350;

export const Search = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = (searchParams.get('q') ?? '').trim();
  const { query: resultsQuery, songs, albums, artists, status } = useAppSelector((state) => state.search);
  const [text, setText] = useState(searchParams.get('q') ?? '');
  const inputRef = useRef<HTMLInputElement>(null);
  const trimmed = text.trim();

  useEffect(() => {
    // Phones would pop the keyboard over everything; only autofocus with a pointer.
    if (window.matchMedia('(hover: hover)').matches) inputRef.current?.focus();
  }, []);

  // Typing updates the URL (debounced, without piling up history entries)...
  useEffect(() => {
    if (trimmed === urlQuery) return;
    const timer = window.setTimeout(() => setSearchParams(trimmed ? { q: trimmed } : {}, { replace: true }), DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [trimmed, urlQuery, setSearchParams]);

  // ...and the URL drives the search, so links and reloads work.
  useEffect(() => {
    if (!urlQuery) {
      dispatch(clearSearch());
    } else if (urlQuery !== resultsQuery) {
      dispatch(runSearch(urlQuery));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlQuery, dispatch]);

  const hasResults = songs.length > 0 || albums.length > 0 || artists.length > 0;
  const active = Boolean(urlQuery);

  return (
    <div className='view'>
      <header className='view__hero view__hero--compact'>
        <h1 className='view__title'>Search</h1>
      </header>
      <form className='search-box' role='search' onSubmit={(event) => {
        event.preventDefault();
        if (trimmed) {
          setSearchParams({ q: trimmed }, { replace: true });
          if (trimmed === urlQuery) dispatch(runSearch(trimmed));
        }
        inputRef.current?.blur();
      }}>
        <i className='fa-solid fa-magnifying-glass' aria-hidden='true' />
        <input ref={inputRef} type='search' value={text} placeholder='Songs, albums, artists'
               aria-label='Search songs, albums and artists' enterKeyHint='search'
               onChange={(event) => setText(event.target.value)} />
        {text && (
          <button type='button' className='search-box__clear' aria-label='Clear search'
                  onClick={() => {
                    setText('');
                    setSearchParams({}, { replace: true });
                    inputRef.current?.focus();
                  }}>
            <i className='fa-solid fa-circle-xmark' />
          </button>
        )}
      </form>

      {!active && (
        <StatusMessage icon='fa-solid fa-headphones' title='Find something to play'>
          Search for a song, album, or artist.
        </StatusMessage>
      )}
      {active && status === 'error' && <ApiError onRetry={() => dispatch(runSearch(urlQuery))} />}
      {active && status === 'loading' && !hasResults && <SongListSkeleton />}
      {active && status === 'ready' && !hasResults && (
        <StatusMessage icon='fa-solid fa-face-meh' title={`No results for “${urlQuery}”`}>
          Check the spelling or try different words.
        </StatusMessage>
      )}
      {active && hasResults && (
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
            <Section title='Albums'>
              <ul className='album-grid'>
                {albums.map((album) => <AlbumCard key={album.id} album={album} />)}
              </ul>
            </Section>
          )}
        </div>
      )}
    </div>
  );
};

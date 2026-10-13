import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { runSearch, setQuery } from "../../redux/reducers/SearchReducer";
import { AlbumCard } from "../../components/AlbumCard";
import { SongList } from "../../components/SongList";
import { Section } from "../../components/Section";
import { ApiError, SongListSkeleton, StatusMessage } from "../../components/Status";
import "../views.scss";

const DEBOUNCE_MS = 350;

export const Search = () => {
  const dispatch = useAppDispatch();
  const { query, songs, albums, status } = useAppSelector((state) => state.search);
  const inputRef = useRef<HTMLInputElement>(null);
  const trimmed = query.trim();

  useEffect(() => {
    // Phones would pop the keyboard over everything; only autofocus with a pointer.
    if (window.matchMedia('(hover: hover)').matches) inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!trimmed) return;
    const timer = window.setTimeout(() => dispatch(runSearch(trimmed)), DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [trimmed, dispatch]);

  const hasResults = songs.length > 0 || albums.length > 0;

  return (
    <div className='view'>
      <header className='view__hero view__hero--compact'>
        <h1 className='view__title'>Search</h1>
      </header>
      <form className='search-box' role='search' onSubmit={(event) => {
        event.preventDefault();
        if (trimmed) dispatch(runSearch(trimmed));
        inputRef.current?.blur();
      }}>
        <i className='fa-solid fa-magnifying-glass' aria-hidden='true' />
        <input ref={inputRef} type='search' value={query} placeholder='Songs, albums, artists'
               aria-label='Search songs and albums' enterKeyHint='search'
               onChange={(event) => dispatch(setQuery(event.target.value))} />
        {query && (
          <button type='button' className='search-box__clear' aria-label='Clear search'
                  onClick={() => { dispatch(setQuery('')); inputRef.current?.focus(); }}>
            <i className='fa-solid fa-circle-xmark' />
          </button>
        )}
      </form>

      {!trimmed && (
        <StatusMessage icon='fa-solid fa-headphones' title='Find something to play'>
          Search for a song, album, or artist.
        </StatusMessage>
      )}
      {trimmed && status === 'error' && <ApiError onRetry={() => dispatch(runSearch(trimmed))} />}
      {trimmed && status === 'loading' && !hasResults && <SongListSkeleton />}
      {trimmed && status === 'ready' && !hasResults && (
        <StatusMessage icon='fa-solid fa-face-meh' title={`No results for “${trimmed}”`}>
          Check the spelling or try different words.
        </StatusMessage>
      )}
      {trimmed && hasResults && (
        <div className={status === 'loading' ? 'view__stale' : ''}>
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

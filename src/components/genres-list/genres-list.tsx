import React from 'react';
import { ALL_GENRES } from '../../consts/genres.ts';
import GenreItem from '../genre-item/genre-item.tsx';
import { useAppSelector } from '../../hooks/store.ts';
import {
  getActiveGenre,
  getFilms,
} from '../../store/film-process/film-process.selector.ts';

export default function GenresList(): React.JSX.Element {
  const activeGenre = useAppSelector(getActiveGenre);
  const films = useAppSelector(getFilms);

  const genreList = [ALL_GENRES, ...new Set(films.map((film) => film.genre))];

  return (
    <ul className="catalog__genres-list">
      {genreList.map((genre) => (
        <GenreItem name={genre} isActive={genre === activeGenre} key={genre} />
      ))}
    </ul>
  );
}

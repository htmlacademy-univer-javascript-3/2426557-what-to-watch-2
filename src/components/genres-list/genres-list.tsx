import React from 'react';
import {ALL_GENRES} from '../../consts/genres.ts';
import GenreItem from '../genre-item/genre-item.tsx';
import {useAppSelector} from '../../hooks/store.ts';

export default function GenresList(): React.JSX.Element {
  const activeGenre = useAppSelector((state) => state.activeGenre);
  const films = useAppSelector((state)=> state.films);

  const genreList = [ALL_GENRES, ...new Set(films.map((film) => film.genre))];

  return (
    <ul className="catalog__genres-list">
      {genreList.map((genre) => (
        <GenreItem name={genre} isActive={genre === activeGenre} key={genre} />
      ))}
    </ul>
  );
}

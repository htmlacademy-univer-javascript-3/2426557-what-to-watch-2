import React from 'react';
import { GENRES } from '../../consts/genres.ts';
import GenreItem from '../genre-item/genre-item.tsx';

export default function GenresList(): React.JSX.Element {
  return (
    <ul className="catalog__genres-list">
      {GENRES.map((genre) => (
        <GenreItem name={genre.name} isActive={genre.isActive} key={genre.id} />
      ))}
    </ul>
  );
}

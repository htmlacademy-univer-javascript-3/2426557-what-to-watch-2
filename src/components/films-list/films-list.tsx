import React from 'react';
import Card from '../../components/card/card';
import { FilmInfoProps } from '../../types/film-types';

type FilmsListProps = {
  films: FilmInfoProps[];
  length?: number;
};

export default function FilmsList({
  films,
  length = 4,
}: FilmsListProps): React.JSX.Element {
  return (
    <div className="catalog__films-list">
      {films.splice(0, length + 1).map((film) => (
        <Card film={film} key={film.name} />
      ))}
    </div>
  );
}

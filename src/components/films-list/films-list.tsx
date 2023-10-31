import React, { useState } from 'react';
import Card from '../../components/card/card';
import { FilmInfoProps } from '../../types/film-types';
import { filmsList } from '../../mocks/films';

type FilmsListProps = {
  films: FilmInfoProps[];
};

export default function FilmsList({
  films = filmsList,
}: FilmsListProps): React.JSX.Element {
  const [activeFilm, setActiveFilm] = useState<number | null>(null);

  const handleCardHover = (filmId: number) => {
    setActiveFilm(filmId);
  };

  const handleCardLeave = () => {
    setActiveFilm(null);
  };

  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <Card
          film={film}
          key={film.name}
          isActive={film.id === activeFilm}
          onMouseEnter={handleCardHover}
          onMouseLeave={handleCardLeave}
        />
      ))}
    </div>
  );
}

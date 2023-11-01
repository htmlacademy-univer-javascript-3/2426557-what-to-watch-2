import React, { useState } from 'react';
import Card from '../../components/card/card';
import { FilmInfoProps } from '../../types/film-types';
import { filmsList } from '../../mocks/films';

type FilmsListProps = {
  films: FilmInfoProps[];
  length?: number;
  genre?: string;
};

export default function FilmsList({
  films = filmsList,
  length = filmsList.length,
  genre,
}: FilmsListProps): React.JSX.Element {
  const [activeFilm, setActiveFilm] = useState<number | null>(null);

  const handleCardHover = (filmId: number) => {
    setActiveFilm(filmId);
  };

  const handleCardLeave = () => {
    setActiveFilm(null);
  };

  const filteredFilms = genre
    ? films.filter((film) => film.genre === genre)
    : films;

  return (
    <div className="catalog__films-list">
      {filteredFilms.slice(0, length).map((film) => (
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

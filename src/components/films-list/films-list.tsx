import React, { useState } from 'react';
import Card from '../../components/card/card';
import { filmsList } from '../../mocks/films';
import {useAppSelector} from '../../hooks/store.ts';

type FilmsListProps = {
  length?: number;
  genre?: string;
};

export default function FilmsList({
  length = filmsList.length,
  genre,
}: FilmsListProps): React.JSX.Element {
  const [activeFilm, setActiveFilm] = useState<number | null>(null);

  const genreFilms = useAppSelector((state) => state.genreFilms);
  const films = useAppSelector((state) => state.films);
  const handleCardHover = (filmId: number) => {
    setActiveFilm(filmId);
  };

  const handleCardLeave = () => {
    setActiveFilm(null);
  };

  const filteredFilms = genre
    ? films.filter((film) => film.genre === genre)
    : genreFilms;

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

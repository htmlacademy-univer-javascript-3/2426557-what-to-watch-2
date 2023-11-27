import React, { useState } from 'react';
import Card from '../../components/card/card';
import { useAppSelector } from '../../hooks/store.ts';
import { DEFAULT_FILM_LIST_LENGTH } from '../../consts/film-list.ts';
import { Spinner } from '../spinner/spinner.tsx';
import { FilmProps } from '../../types/film-types.ts';

type FilmsListProps = {
  length?: number;
  similar?: FilmProps[];
};

export default function FilmsList({
  length = DEFAULT_FILM_LIST_LENGTH,
  similar,
}: FilmsListProps): React.JSX.Element {
  const [activeFilm, setActiveFilm] = useState<number | null>(null);

  const genreFilms = useAppSelector((state) => state.genreFilms);
  const isLoading = useAppSelector((state) => state.isLoadingList);

  const handleCardHover = (filmId: number) => {
    setActiveFilm(filmId);
  };

  const handleCardLeave = () => {
    setActiveFilm(null);
  };

  const filteredFilms = similar || genreFilms;

  return (
    <div className="catalog__films-list">
      {isLoading ? (
        <Spinner />
      ) : (
        filteredFilms
          .slice(0, length)
          .map((film) => (
            <Card
              film={film}
              key={film.name}
              isActive={film.id === activeFilm}
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            />
          ))
      )}
    </div>
  );
}

import React, { useState } from 'react';
import Card from '../../components/card/card';
import { useAppSelector } from '../../hooks/store.ts';
import { DEFAULT_FILM_LIST_LENGTH } from '../../consts/film-list.ts';
import { Spinner } from '../spinner/spinner.tsx';
import { FilmProps } from '../../types/film-types.ts';
import {
  getFilmsByGenre,
  getIsLoadingList,
} from '../../store/films-process/films-process.selector.ts';

type FilmsListProps = {
  length?: number;
  films?: FilmProps[];
};

function FilmsList({
  length = DEFAULT_FILM_LIST_LENGTH,
  films,
}: FilmsListProps): React.JSX.Element {
  const [activeFilm, setActiveFilm] = useState<number | null>(null);

  const genreFilms = useAppSelector(getFilmsByGenre);
  const isLoading = useAppSelector(getIsLoadingList);

  const handleCardHover = (filmId: number) => {
    setActiveFilm(filmId);
  };

  const handleCardLeave = () => {
    setActiveFilm(null);
  };

  const filteredFilms = films || genreFilms;

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

const FilmsListMemo = React.memo(FilmsList);

export default FilmsListMemo;

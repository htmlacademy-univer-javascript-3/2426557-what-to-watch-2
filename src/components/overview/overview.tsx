import React from 'react';
import { FilmInfoProps } from '../../types/film-types.ts';
import { useFilmRating } from '../../hooks/film.ts';

type OverviewProps = {
  film: FilmInfoProps;
};
function Overview({ film }: OverviewProps): React.JSX.Element {
  const filmRating = useFilmRating(film.rating);

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{filmRating}</span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>
      <div className="film-card__text">
        <p>{film.description}</p>
        <p className="film-card__director">
          <strong>Director: {film.director}</strong>
        </p>
        <p className="film-card__starring">
          <strong>Starring:{film.starring.join(', ')}</strong>
        </p>
      </div>
    </>
  );
}
const OverviewMemo = React.memo(Overview);

export default OverviewMemo;

import React from 'react';
import { FilmInfoProps } from '../../types/film-types.ts';

type OverviewProps = {
  film: FilmInfoProps;
};
export default function Overview({ film }: OverviewProps): React.JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">240 ratings</span>
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

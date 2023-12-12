import React from 'react';
import { FilmInfoProps } from '../../types/film-types.ts';
import { formatRunTime } from '../../utils/time.ts';

type FilmDetailsProps = {
  film: FilmInfoProps;
};
function FilmDetails({ film }: FilmDetailsProps): React.JSX.Element {
  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{film.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {film.starring?.map(
              (star, index) =>
                film.starring && (
                  <React.Fragment key={star}>
                    {star}
                    {index < film.starring.length - 1 && <br />}
                  </React.Fragment>
                )
            )}
          </span>
        </p>
      </div>
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">
            {formatRunTime(film.runTime)}
          </span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{film.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{film.released}</span>
        </p>
      </div>
    </div>
  );
}

const FilmDetailsMemo = React.memo(FilmDetails);

export default FilmDetailsMemo;

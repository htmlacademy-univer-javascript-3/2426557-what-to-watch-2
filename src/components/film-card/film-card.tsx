import FilmCardButtons from '../film-card-buttons/film-card-buttons';
import Header from '../header/header';
import React from 'react';
import FilmCardPoster from '../film-card-poster/film-card-poster';
import { FilmPromo } from '../../types/film-types';
import { AuthorizationStatus } from '../../enums/AuthorizationStatus';
import { useAppSelector } from '../../hooks/store';
import { getAuthStatus } from '../../store/user-process/user-process.selector';
import { getFavoriteFilms } from '../../store/films-process/films-process.selector';

type FilmCardProps = {
  film: FilmPromo;
};

function FilmCard({ film }: FilmCardProps): React.JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);
  const isAuth = authStatus === AuthorizationStatus.Auth;
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const isFavorite = favoriteFilms?.find(
    (favorite) => String(favorite.id) === String(film.id)
  );

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={film.backgroundImage} alt={film.name} />
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <Header />
      <div className="film-card__wrap">
        <div className="film-card__info">
          <FilmCardPoster src={film.posterImage} alt={film.name} />
          <div className="film-card__desc">
            <h2 className="film-card__title">{film.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{film.genre}</span>
              <span className="film-card__year">{film.released}</span>
            </p>
            <FilmCardButtons
              id={film.id}
              isFavorite={Boolean(isFavorite)}
              isAuth={isAuth}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const FilmCardMemo = React.memo(FilmCard);

export default FilmCardMemo;

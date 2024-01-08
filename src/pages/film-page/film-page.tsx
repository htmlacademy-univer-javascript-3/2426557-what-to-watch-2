import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer.tsx';
import Header from '../../components/header/header.tsx';
import FilmCardPoster from '../../components/film-card-poster/film-card-poster.tsx';
import FilmsList from '../../components/films-list/films-list.tsx';
import { AppRoute } from '../../enums/app-route.ts';
import Tabs from '../../components/tabs/tabs.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import {
  fetchFilmById,
  fetchFilmReviews,
  fetchSimilarFilms,
} from '../../store/api-actions.ts';
import { Spinner } from '../../components/spinner/spinner.tsx';
import { AuthorizationStatus } from '../../enums/authorization-status.ts';

import { getAuthStatus } from '../../store/user-process/user-process.selector.ts';
import {
  getFilm,
  getIsLoadingFilm,
  getReviews,
} from '../../store/film-process/film-process.selector.ts';
import FilmCardButtons from '../../components/film-card-buttons/film-card-buttons.tsx';
import PageNotFound from '../page-not-found/page-not-found.tsx';
import { getFavoriteFilms } from '../../store/films-process/films-process.selector.ts';

export default function FilmPage(): React.JSX.Element {
  const { id = '' } = useParams();

  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const reviews = useAppSelector(getReviews);
  const isLoading = useAppSelector(getIsLoadingFilm);
  const authStatus = useAppSelector(getAuthStatus);
  const isAuth = authStatus === AuthorizationStatus.Auth;
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const isFavorite = favoriteFilms?.find(
    (favorite) => String(favorite.id) === String(film?.id)
  );

  useEffect(() => {
    if (id && id !== film?.id) {
      dispatch(fetchFilmById(id));
      dispatch(fetchSimilarFilms(id));
      dispatch(fetchFilmReviews(id));
    }
  }, [id, dispatch, film?.id]);

  if (isLoading) {
    return <Spinner size="large" />;
  }

  if (!id) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  return film ? (
    <>
      <section
        className="film-card film-card--full"
        style={{ backgroundColor: film.backgroundColor }}
      >
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <Header />
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>
              <FilmCardButtons
                isAuth={isAuth}
                id={film.id}
                isFavorite={Boolean(isFavorite)}
                isReviewButtonVisible
              />
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <FilmCardPoster src={film.posterImage} alt={film.name} />
            <Tabs film={film} reviews={reviews} />
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmsList length={4} />
        </section>
        <Footer />
      </div>
    </>
  ) : (
    <PageNotFound />
  );
}

import React, { useLayoutEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import FilmCardPoster from '../../components/film-card-poster/film-card-poster';
import FilmsList from '../../components/films-list/films-list';
import { AppRoute } from '../../enums/AppRoute';
import Tabs from '../../components/tabs/tabs.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { fetchFilmById } from '../../store/api-actions.ts';
import { Spinner } from '../../components/spinner/spinner';

export default function MoviePage(): React.JSX.Element {
  const { id = '' } = useParams();

  const dispatch = useAppDispatch();
  const film = useAppSelector((state) => state.currentFilm);
  const isLoading = useAppSelector((state) => state.isLoading);

  useLayoutEffect(() => {
    if (id) {
      dispatch(fetchFilmById(id));
    }
  }, [id, dispatch]);

  if (isLoading && !film) {
    return <Spinner />;
  }

  // Для потомков: надо подебажить
  if (!film) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img
              src="img/bg-the-grand-budapest-hotel.jpg"
              alt="The Grand Budapest Hotel"
            />
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
              <div className="film-card__buttons">
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width={19} height={19}>
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 20" width={19} height={20}>
                    <use xlinkHref="#add" />
                  </svg>
                  {/* Для дальнейшей разработки
                  <svg viewBox="0 0 18 14" width={18} height={14}>
                    <use xlinkHref="#in-list" />
                  </svg> */}
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link
                  to={`${AppRoute.Films}/${film.id}${AppRoute.Review}`}
                  className="btn film-card__button"
                >
                  Add review
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <FilmCardPoster src={film.backgroundImage} alt={film.name} />
            <Tabs film={film} />
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmsList length={4} genre={film.genre} />
        </section>
        <Footer />
      </div>
    </>
  );
}

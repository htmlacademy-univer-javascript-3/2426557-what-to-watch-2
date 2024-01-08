import React, { useEffect } from 'react';
import Footer from '../../components/footer/footer';
import FilmCard from '../../components/film-card/film-card';
import Catalog from '../../components/catalog/catalog';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { fetchFavorite, fetchFilmPromo } from '../../store/api-actions.ts';
import { getPromoFilm } from '../../store/films-process/films-process.selector.ts';
import { getAuthStatus } from '../../store/user-process/user-process.selector.ts';
import { AuthorizationStatus } from '../../enums/authorization-status.ts';

export default function MainPage(): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const promoFilm = useAppSelector(getPromoFilm);
  const authStatus = useAppSelector(getAuthStatus);
  const isAuth = authStatus === AuthorizationStatus.Auth;

  useEffect(() => {
    dispatch(fetchFilmPromo());

    if (isAuth) {
      dispatch(fetchFavorite());
    }
  }, [dispatch, isAuth]);

  if (!promoFilm) {
    return null;
  }

  return (
    <>
      <FilmCard film={promoFilm} />
      <div className="page-content">
        <Catalog />
        <Footer />
      </div>
    </>
  );
}

import React, { useEffect } from 'react';
import Footer from '../../components/footer/footer';
import FilmCard from '../../components/film-card/film-card';
import Catalog from '../../components/catalog/catalog';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { fetchFavorite, fetchFilmPromo } from '../../store/api-actions.ts';
import {
  getIsLoadingPromo,
  getPromoFilm,
} from '../../store/films-process/films-process.selector.ts';
import { getAuthStatus } from '../../store/user-process/user-process.selector.ts';
import { AuthorizationStatus } from '../../enums/authorization-status.ts';
import { Spinner } from '../../components/spinner/spinner.tsx';
import PageNotFound from '../page-not-found/page-not-found.tsx';

export default function MainPage(): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const promoFilm = useAppSelector(getPromoFilm);
  const isLoadingPromo = useAppSelector(getIsLoadingPromo);
  const authStatus = useAppSelector(getAuthStatus);
  const isAuth = authStatus === AuthorizationStatus.Auth;

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchFilmPromo());

      if (isAuth) {
        dispatch(fetchFavorite());
      }
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, isAuth]);

  if (isLoadingPromo) {
    return <Spinner />;
  }

  return promoFilm ? (
    <>
      <FilmCard film={promoFilm} />
      <div className="page-content">
        <Catalog />
        <Footer />
      </div>
    </>
  ) : (
    <PageNotFound />
  );
}

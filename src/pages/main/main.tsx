import React, { useEffect } from 'react';
import Footer from '../../components/footer/footer';
import FilmCard from '../../components/film-card/film-card';
import Catalog from '../../components/catalog/catalog';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { fetchFilmPromo } from '../../store/api-actions.ts';
import { getPromoFilm } from '../../store/film-process/film-process.selector.ts';

export default function MainPage(): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const promoFilm = useAppSelector(getPromoFilm);

  useEffect(() => {
    dispatch(fetchFilmPromo());
  }, [dispatch]);

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

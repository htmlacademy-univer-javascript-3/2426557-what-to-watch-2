import React from 'react';
import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import UserBlock from '../../components/user-block/user-block';
import FilmsList from '../../components/films-list/films-list';
import { useAppSelector } from '../../hooks/store';
import { getFilms } from '../../store/films-process/films-process.selector';

export default function MyList(): React.JSX.Element {
  const films = useAppSelector(getFilms);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">
          My list <span className="user-page__film-count">9</span>
        </h1>
        <UserBlock />
      </header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmsList similar={films} />
      </section>
      <Footer />
    </div>
  );
}

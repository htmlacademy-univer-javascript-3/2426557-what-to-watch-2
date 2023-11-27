import React from 'react';
import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import UserBlock from '../../components/user-block/user-block';
import {FilmProps} from '../../types/film-types';
import FilmsList from '../../components/films-list/films-list';

type MyListProps = {
  films: FilmProps[];
};

export default function MyList({ films }: MyListProps): React.JSX.Element {
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

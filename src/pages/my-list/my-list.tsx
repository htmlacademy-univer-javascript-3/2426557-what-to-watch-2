import React from 'react';
import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import UserBlock from '../../components/user-block/user-block';
import FilmsList from '../../components/films-list/films-list';
import { useAppSelector } from '../../hooks/store';
import { getFavoriteFilms } from '../../store/films-process/films-process.selector';
import { AuthorizationStatus } from '../../enums/authorization-status.ts';
import { getAuthStatus } from '../../store/user-process/user-process.selector';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../enums/app-route.ts';

export default function MyList(): React.JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);
  const isAuth = authStatus === AuthorizationStatus.Auth;
  const navigate = useNavigate();

  if (!isAuth) {
    navigate(AppRoute.Login);
  }

  const favoriteFilms = useAppSelector(getFavoriteFilms);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">
          My list
          <span className="user-page__film-count">{favoriteFilms.length}</span>
        </h1>
        <UserBlock />
      </header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmsList films={favoriteFilms} />
      </section>
      <Footer />
    </div>
  );
}

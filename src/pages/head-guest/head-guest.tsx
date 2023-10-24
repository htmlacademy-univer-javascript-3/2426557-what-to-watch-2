import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { AppRoute } from '../../enums/AppRoute';

export default function HeadGuest(): React.JSX.Element {
  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src="img/bg-header.jpg" />
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <header className="page-header">
        <Logo />
        <div className="user-block">
          <Link to={`${AppRoute.Login}`} className="user-block__link">
            Sign in
          </Link>
        </div>
      </header>
    </section>
  );
}

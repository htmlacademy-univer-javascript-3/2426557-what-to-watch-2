import React from 'react';
import Logo from '../../components/logo/logo';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';

export default function MyList(): React.JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">
          My list <span className="user-page__film-count">9</span>
        </h1>
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img
                src="img/avatar.jpg"
                alt="User avatar"
                width={63}
                height={63}
              />
            </div>
          </li>
          <li className="user-block__item">
            <Link className="user-block__link" to="/login">
              Sign out
            </Link>
          </li>
        </ul>
      </header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <div className="catalog__films-list">
          <article className="small-film-card catalog__films-card">
            <div className="small-film-card__image">
              <img
                src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg"
                alt="Fantastic Beasts: The Crimes of Grindelwald"
                width={280}
                height={175}
              />
            </div>
            <h3 className="small-film-card__title">
              <Link className="small-film-card__link" to="/films:id">
                Fantastic Beasts: The Crimes of Grindelwald
              </Link>
            </h3>
          </article>
          <article className="small-film-card catalog__films-card">
            <div className="small-film-card__image">
              <img
                src="img/bohemian-rhapsody.jpg"
                alt="Bohemian Rhapsody"
                width={280}
                height={175}
              />
            </div>
            <h3 className="small-film-card__title">
              <Link className="small-film-card__link" to="/films:id">
                Bohemian Rhapsody
              </Link>
            </h3>
          </article>
          <article className="small-film-card catalog__films-card">
            <div className="small-film-card__image">
              <img
                src="img/macbeth.jpg"
                alt="Macbeth"
                width={280}
                height={175}
              />
            </div>
            <h3 className="small-film-card__title">
              <Link className="small-film-card__link" to="/films:id">
                Macbeth
              </Link>
            </h3>
          </article>
          <article className="small-film-card catalog__films-card">
            <div className="small-film-card__image">
              <img
                src="img/aviator.jpg"
                alt="Aviator"
                width={280}
                height={175}
              />
            </div>
            <h3 className="small-film-card__title">
              <Link className="small-film-card__link" to="/films:id">
                Aviator
              </Link>
            </h3>
          </article>
          <article className="small-film-card catalog__films-card">
            <div className="small-film-card__image">
              <img
                src="img/we-need-to-talk-about-kevin.jpg"
                alt="We need to talk about Kevin"
                width={280}
                height={175}
              />
            </div>
            <h3 className="small-film-card__title">
              <Link className="small-film-card__link" to="/films:id">
                We need to talk about Kevin
              </Link>
            </h3>
          </article>
          <article className="small-film-card catalog__films-card">
            <div className="small-film-card__image">
              <img
                src="img/what-we-do-in-the-shadows.jpg"
                alt="What We Do in the Shadows"
                width={280}
                height={175}
              />
            </div>
            <h3 className="small-film-card__title">
              <Link className="small-film-card__link" to="/films:id">
                What We Do in the Shadows
              </Link>
            </h3>
          </article>
          <article className="small-film-card catalog__films-card">
            <div className="small-film-card__image">
              <img
                src="img/revenant.jpg"
                alt="Revenant"
                width={280}
                height={175}
              />
            </div>
            <h3 className="small-film-card__title">
              <Link className="small-film-card__link" to="/films:id">
                Revenant
              </Link>
            </h3>
          </article>
          <article className="small-film-card catalog__films-card">
            <div className="small-film-card__image">
              <img
                src="img/johnny-english.jpg"
                alt="Johnny English"
                width={280}
                height={175}
              />
            </div>
            <h3 className="small-film-card__title">
              <Link className="small-film-card__link" to="/films:id">
                Johnny English
              </Link>
            </h3>
          </article>
          <article className="small-film-card catalog__films-card">
            <div className="small-film-card__image">
              <img
                src="img/shutter-island.jpg"
                alt="Shutter Island"
                width={280}
                height={175}
              />
            </div>
            <h3 className="small-film-card__title">
              <Link className="small-film-card__link" to="/films:id">
                Shutter Island
              </Link>
            </h3>
          </article>
        </div>
      </section>
      <Footer />
    </div>
  );
}

import { FilmInfoProps } from '../../types/film-types.ts';
import Card from '../card/card';
import GenresList from '../genres-list/genres-list.tsx';
import React from 'react';

type CatalogProps = {
  films: FilmInfoProps[];
};

export default function Catalog({ films }: CatalogProps): React.JSX.Element {
  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenresList />
      <div className="catalog__films-list">
        {films.map((film) => (
          <Card film={film} key={film.name} />
        ))}
      </div>
      <div className="catalog__more">
        <button className="catalog__button" type="button">
          Show more
        </button>
      </div>
    </section>
  );
}

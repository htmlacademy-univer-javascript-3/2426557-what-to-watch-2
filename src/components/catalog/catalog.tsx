import Card from '../card/card';
import GenresList from '../genres-list/genres-list.tsx';
import React from 'react';

export default function Catalog(): React.JSX.Element {
  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenresList/>
      <div className="catalog__films-list">
        {Array.from({ length: 20 }, (_, index) => (
          <Card key={index} />
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

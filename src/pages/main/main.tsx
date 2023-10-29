import React from 'react';
import Footer from '../../components/footer/footer';
import FilmCard from '../../components/film-card/film-card';
import Catalog from '../../components/catalog/catalog';
import { FilmInfoProps } from '../../types/film-types';

type MainProps = {
  films: FilmInfoProps[];
};

export default function MainPage({ films }: MainProps): React.JSX.Element {
  return (
    <>
      <FilmCard film={films[0]} />
      <div className="page-content">
        <Catalog films={films} />
        <Footer />
      </div>
    </>
  );
}

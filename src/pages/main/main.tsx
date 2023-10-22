import React from 'react';
import Footer from '../../components/footer/footer';
import FilmCard from '../../components/film-card/film-card';
import Catalog from '../../components/catalog/catalog';

type MainProps = {
  filmName: string;
  genre: string;
  releaseDate: string;
};

export default function MainPage(props: MainProps): React.JSX.Element {
  return (
    <>
      <FilmCard {...props} />
      <div className="page-content">
        <Catalog />
        <Footer />
      </div>
    </>
  );
}

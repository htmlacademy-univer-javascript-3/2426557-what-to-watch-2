import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const initialProps = {
  filmName: 'The Grand Budapest Hotel',
  genre: 'Drama',
  releaseDate: '2014',
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      filmName={initialProps.filmName}
      genre={initialProps.genre}
      releaseDate={initialProps.releaseDate}
    />
  </React.StrictMode>
);

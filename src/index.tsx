import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { filmsList } from './mocks/films';

const initialProps = {
  films: filmsList,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App films={initialProps.films} />
  </React.StrictMode>
);

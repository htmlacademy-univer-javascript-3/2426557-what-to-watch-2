import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { filmsList } from './mocks/films';
import {Provider} from 'react-redux';
import {store} from './store';

const initialProps = {
  films: filmsList,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App films={initialProps.films} />
    </ Provider>
  </React.StrictMode>
);

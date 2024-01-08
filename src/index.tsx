import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import {
  fetchFilms,
  checkAuthStatus,
  // fetchFavorite,
} from './store/api-actions.ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import browserHistory from './browser-history.ts';
import HistoryRouter from './components/history-router/history-router.tsx';

store.dispatch(fetchFilms());
store.dispatch(checkAuthStatus());
// store.dispatch(fetchFavorite());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
        <ToastContainer />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main/main';
import MyList from '../../pages/my-list/my-list';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import AddReview from '../../pages/add-review/add-review';
import SignIn from '../../pages/sign-in/sign-in';
import MoviePage from '../../pages/movie-page/movie-page';
import Player from '../../pages/player/player';
import { AppRoute } from '../../enums/AppRoute';
import PrivateRoute from '../private-route/private-route';
import ScrollToTop from '../scroll-to-top/scroll-to-top.tsx';
import { getAuthStatus } from '../../store/user-process/user-process.selector.ts';
import { useAppSelector } from '../../hooks/store.ts';
import { HelmetProvider } from 'react-helmet-async';

export default function App(): React.JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  return (
    <HelmetProvider>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoute.Main}>
          <Route index element={<MainPage />} />
          <Route path={AppRoute.Login} element={<SignIn />} />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute authStatus={authStatus}>
                <MyList />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Films}>
            <Route path=":id" element={<MoviePage />} />
            <Route
              path={`:id${AppRoute.Review}`}
              element={
                <PrivateRoute authStatus={authStatus}>
                  <AddReview />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path={`${AppRoute.Player}/:id`} element={<Player />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </HelmetProvider>
  );
}

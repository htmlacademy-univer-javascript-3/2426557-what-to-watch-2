import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main/main';
import MyList from '../../pages/my-list/my-list';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import AddReview from '../../pages/add-review/add-review';
import SignIn from '../../pages/sign-in/sign-in';
import MoviePage from '../../pages/movie-page/movie-page';
import Player from '../../pages/player/player';
import { AppRoute } from '../../enums/AppRoute';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  filmName: string;
  genre: string;
  releaseDate: string;
};

export default function App({
  filmName,
  genre,
  releaseDate,
}: AppProps): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main}>
          <Route
            index
            element={
              <MainPage
                filmName={filmName}
                genre={genre}
                releaseDate={releaseDate}
              />
            }
          />
          <Route path={AppRoute.Login} element={<SignIn />} />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute>
                <MyList />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Films}>
            <Route path=":id" element={<MoviePage />} />
            <Route
              path={AppRoute.Review}
              element={
                <PrivateRoute>
                  <AddReview />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path={AppRoute.Player} element={<Player />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

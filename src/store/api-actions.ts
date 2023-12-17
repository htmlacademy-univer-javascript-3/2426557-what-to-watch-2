import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {FilmInfoProps, FilmPromo, FilmProps} from '../types/film-types.ts';
// import {redirectToRoute,
//   // setActiveGenre,
// } from './action.ts';
// import {ALL_GENRES} from '../consts/genres.ts';
import {AddUserReview, ReviewProps, UserReview} from '../types/review-types.ts';
// import {AuthorizationStatus} from '../enums/AuthorizationStatus.ts';
import {AuthData, UserData} from '../types/auth.ts';
import { AppRoute } from '../enums/AppRoute.ts';
// import { setToken } from '../services/token.ts';
import { redirectToRoute } from './action.ts';
import { FavoriteStatus } from '../enums/FavoriteStatus.ts';
// import {AppRoute} from '../enums/AppRoute.ts';
// import {removeToken, setToken} from '../services/token.ts';

export const fetchFilms = createAsyncThunk<FilmProps[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  '/films',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<FilmProps[]>('/films');

    return data;
  }
);

export const fetchFilmById = createAsyncThunk<
FilmInfoProps,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  '/films/id',
  async (id: string, {extra: api}) => {

    const { data } = await api.get<FilmInfoProps>(`/films/${id}`);
    return data;
  },
);

export const fetchSimilarFilms = createAsyncThunk<
  FilmProps[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    '/films/id/similar',
    async (id: string, { extra: api}) => {
      const { data } = await api.get<FilmProps[]>(`/films/${id}/similar`);

      return data;
    },
  );

export const fetchFavorite = createAsyncThunk<
  FilmProps[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    '/favorite',
    async (_arg, { extra: api}) => {
      const {data} = await api.get<FilmProps[]>('/favorite');

      return data;
    }
  );

export const changeFavoriteStatus = createAsyncThunk<
  void,
  {filmId: string; status: FavoriteStatus},
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'favorite/status',
    async ({filmId, status}, { extra: api}) => {
      await api.post(`/favorite/${filmId}/${status}`);
    },
  );

export const fetchFilmPromo = createAsyncThunk<
  FilmPromo,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    '/promo',
    async (_arg, { extra: api}) => {
      const { data } = await api.get<FilmPromo>('/promo');

      return data;
    },
  );

export const fetchFilmReviews = createAsyncThunk<
  ReviewProps[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  '/comments/id',
  async (id, { extra: api}) => {

    const { data } = await api.get<ReviewProps[]>(`/comments/${id}`);

    return data;
  },
);

export const checkAuthStatus = createAsyncThunk<
  void,
  undefined,
  {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }
  >(
    '/login',
    async (_arg, { extra: api}) => {
      await api.get('/login');
    },
  );

export const loginUser = createAsyncThunk<
  UserData,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({email, password}, { dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(
      '/login',
      {
        email,
        password,
      }
    );

    dispatch(redirectToRoute(AppRoute.Main));

    return data;
  },
);

export const logoutUser = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/logout',
  async (_arg, { extra: api}) => {
    await api.delete('/logout');
  },
);

export const addCommentAction = createAsyncThunk<void, AddUserReview, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'addCommentAction',
  async ({filmId, comment, rating}, {extra: api}) => {
    await api.post<UserReview>(`comments/${filmId}`, {comment, rating});
  },
);

import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {FilmInfoProps, FilmPromo, FilmProps} from '../types/film-types.ts';
import {AddUserReview, ReviewProps, UserReview} from '../types/review-types.ts';
import {AuthData, UserData} from '../types/auth.ts';
import { AppRoute } from '../enums/app-route.ts';
import { redirectToRoute } from './action.ts';
import { FavoriteStatus } from '../enums/favorite-status.ts';
import { AuthorizationStatus } from '../enums/authorization-status.ts';
import { setAuthStatus } from './user-process/user-process.slice.ts';

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
  UserData | void,
  undefined,
  {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }
  >(
    'user/check',
    async (_arg, { extra: api}) => {

      const {data} = await api.get<UserData>('/login');

      if(!data) {
        setAuthStatus(AuthorizationStatus.NoAuth);
      } else {
        setAuthStatus(AuthorizationStatus.Auth);
      }

      return data;
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

import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {FilmInfoProps, FilmPromo, FilmProps} from '../types/film-types.ts';
import {
  getFilmsByGenre,
  loadFilmReviews,
  loadFilms,
  setActiveGenre,
  setAuthStatus,
  setCurrentFilm,
  setIsLoadingFilm,
  setIsLoadingList,
  setPromoFilm
} from './action.ts';
import {ALL_GENRES} from '../consts/genres.ts';
import {ReviewProps} from '../types/review-types.ts';
import {AuthorizationStatus} from '../enums/AuthorizationStatus.ts';


export const fetchFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  '/films',
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(setIsLoadingList(true));

      const { data } = await api.get<FilmProps[]>('/films');

      dispatch(loadFilms(data));
      dispatch(setActiveGenre({genre: ALL_GENRES}));
      dispatch(getFilmsByGenre());
    } catch(e) {
      console.log(e);
    } finally {
      dispatch(setIsLoadingList(false));
    }
  },
);

export const fetchFilmById = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  '/films/id',
  async (id: string, { dispatch, extra: api}) => {
    try {
      dispatch(setIsLoadingFilm(true));

      const { data } = await api.get<FilmInfoProps>(`/films/${id}`);

      dispatch(setCurrentFilm(data));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setIsLoadingFilm(false));
    }

    // return data;
  },
);

export const fetchFilmPromo = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    '/promo',
    async (_arg, { dispatch, extra: api}) => {
      const { data } = await api.get<FilmPromo>('/promo');
      dispatch(setPromoFilm(data));
    },
  );

export const fetchFilmReviews = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  '/comments/id',
  async (id, {dispatch, extra: api}) => {
    try {
      dispatch(setIsLoadingList(true));

      const { data } = await api.get<ReviewProps[]>(`/comments/${id}`);

      dispatch(loadFilmReviews(data));
    } catch(e) {
      console.log(e);
    } finally {
      dispatch(setIsLoadingList(false));
    }
  },
);

export const getAuthStatus = createAsyncThunk<
  void,
  undefined,
  {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }
  >(
    '/login',
    async (_arg, { dispatch, extra: api}) => {
      try {
        await api.get('/login');
        dispatch(setAuthStatus(AuthorizationStatus.Auth));
      } catch (e) {
        dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
      }
    },
  );

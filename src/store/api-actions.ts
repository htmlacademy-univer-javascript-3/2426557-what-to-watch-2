import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {FilmInfoProps, FilmPromo, FilmProps} from '../types/film-types.ts';
import {
  getFilmsByGenre, loadFilmReviews,
  loadFilms,
  setActiveGenre,
  setCurrentFilm,
  setIsLoading,
  setPromoFilm
} from './action.ts';
import {ALL_GENRES} from '../consts/genres.ts';
import {ReviewProps} from '../types/review-types.ts';


export const fetchFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  '/films',
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(setIsLoading(true));

      const { data } = await api.get<FilmProps[]>('/films');

      dispatch(loadFilms(data));
      dispatch(setActiveGenre({genre: ALL_GENRES}));
      dispatch(getFilmsByGenre());
    } catch(e) {
      console.log(e);
    } finally {
      dispatch(setIsLoading(false));
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
      dispatch(setIsLoading(true));

      const { data } = await api.get<FilmInfoProps>(`/films/${id}`);

      dispatch(setCurrentFilm(data));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setIsLoading(false));
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
      dispatch(setIsLoading(true));

      const { data } = await api.get<ReviewProps[]>(`/comments/${id}`);

      dispatch(loadFilmReviews(data));
    } catch(e) {
      console.log(e);
    } finally {
      dispatch(setIsLoading(false));
    }
  },
);

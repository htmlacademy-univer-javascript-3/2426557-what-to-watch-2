import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {FilmInfoProps, FilmPromo, FilmProps} from '../types/film-types.ts';
import {loadFilms, setCurrentFilm, setPromoFilm} from './action.ts';


export const fetchFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  '/films',
  async (_arg, {dispatch, extra: api}) => {
    const { data } = await api.get<FilmProps[]>('/films');
    dispatch(loadFilms(data));
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
    const { data } = await api.get<FilmInfoProps>(`/films/${id}`);
    dispatch(setCurrentFilm(data));
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

import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {FilmInfoProps, FilmProps} from '../types/film-types.ts';
import {loadFilms, setCurrentFilm} from './action.ts';


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
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  '/films/id',
  async (id: number, { dispatch, extra: api}) => {
    const { data } = await api.get<FilmInfoProps>(`/films/${id}`);
    dispatch(setCurrentFilm(data));
    // return data;
  },
);

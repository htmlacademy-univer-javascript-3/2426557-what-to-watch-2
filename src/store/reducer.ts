import { createReducer } from '@reduxjs/toolkit';
import {ALL_GENRES} from '../consts/genres.ts';
import { filmsList } from '../mocks/films';
import {getFilmsByGenre, setActiveGenre} from './action.ts';

const initialState = {
  films: filmsList,
  genre: ALL_GENRES,
  genreFilms: filmsList,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveGenre, (state, action) => {
      const {genre} = action.payload;

      state.genre = genre;
    })
    .addCase(getFilmsByGenre, (state) => {
      state.genreFilms =
      state.genre === ALL_GENRES
        ? filmsList
        : filmsList.filter((film) => film.genre === state.genre);
    });
});

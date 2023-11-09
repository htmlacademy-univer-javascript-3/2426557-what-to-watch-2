import { createReducer } from '@reduxjs/toolkit';
import {ALL_GENRES} from '../consts/genres.ts';
import { filmsList } from '../mocks/films';
import {getFilmsByGenre, setActiveGenre} from './action.ts';

const initialState = {
  films: filmsList,
  activeGenre: ALL_GENRES,
  genreFilms: filmsList,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveGenre, (state, action) => {
      const {genre} = action.payload;

      state.activeGenre = genre;
    })
    .addCase(getFilmsByGenre, (state) => {
      state.genreFilms =
      state.activeGenre === ALL_GENRES
        ? filmsList
        : filmsList.filter((film) => film.genre === state.activeGenre);
    });
});

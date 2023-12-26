import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../consts/name-space.ts';
import {
  fetchFilmById,
  fetchFilmReviews,
  fetchSimilarFilms
} from '../api-actions.ts';
import {FilmProcessState} from '../../types/state.ts';

const initialState: FilmProcessState = {
  currentFilm: null,
  isLoadingFilm: true,
  similarFilms: [],
  reviews: [],
};

export const filmReducer = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {
    resetFilmDependencies: (state) => {
      state.currentFilm = null;
      state.similarFilms = [];
      state.reviews = [];
      state.isLoadingFilm = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmById.pending, (state) => {
        state.isLoadingFilm = true;
      })
      .addCase(fetchFilmById.fulfilled, (state, action) => {
        state.currentFilm = action.payload;
        state.isLoadingFilm = false;
      })
      .addCase(fetchFilmById.rejected, (state) => {
        state.currentFilm = null;
        state.isLoadingFilm = false;
      })
      .addCase(fetchSimilarFilms.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(fetchSimilarFilms.rejected, (state) => {
        state.similarFilms = [];
      })
      .addCase(fetchFilmReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchFilmReviews.rejected, (state) => {
        state.reviews = [];
      });
  }
});

export const {resetFilmDependencies} = filmReducer.actions;

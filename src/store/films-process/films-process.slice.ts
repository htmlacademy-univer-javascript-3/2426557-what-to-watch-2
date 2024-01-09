import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../enums/name-space.ts';
import {
  fetchFavorite,
  fetchFilmPromo,
  fetchFilms,
} from '../api-actions.ts';
import {ALL_GENRES} from '../../consts/genres.ts';
import {FilmsProcessState} from '../../types/state.ts';

const initialState: FilmsProcessState = {
  films: [],
  activeGenre: ALL_GENRES,
  genreFilms: [],
  promoFilm: null,
  isLoadingList: true,
  favoriteFilms: [],
  isLoadingPromo: false,
};

export const filmsReducer = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    setFilmsByGenre: (state) => {
      state.genreFilms =
          state.activeGenre === ALL_GENRES
            ? state.films
            : state.films.filter((film) => film.genre === state.activeGenre);
    },
    setActiveGenre: (state, action) => {
      state.activeGenre = String(action.payload);
    },
    resetFavoriteFilms: (state) => {
      state.favoriteFilms = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.isLoadingList = true;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.films = action.payload;
        state.genreFilms = state.films;
        state.isLoadingList = false;
      })
      .addCase(fetchFilms.rejected, (state)=> {
        state.films = [];
        state.isLoadingList = true;
      })
      .addCase(fetchFavorite.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
      })
      .addCase(fetchFavorite.rejected, (state) => {
        state.favoriteFilms = [];
      })
      .addCase(fetchFilmPromo.pending, (state) => {
        state.isLoadingPromo = true;
      })
      .addCase(fetchFilmPromo.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.isLoadingPromo = false;
      })
      .addCase(fetchFilmPromo.rejected, (state) => {
        state.promoFilm = null;
        state.isLoadingPromo = false;
      });
  }
});

export const {setFilmsByGenre, setActiveGenre, resetFavoriteFilms} = filmsReducer.actions;

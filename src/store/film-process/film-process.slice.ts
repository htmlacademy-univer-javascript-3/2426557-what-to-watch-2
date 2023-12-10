import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../consts/name-space.ts';
import {
  fetchFavorite,
  fetchFilmById,
  fetchFilmPromo,
  fetchFilms,
  fetchSimilarFilms
} from '../api-actions.ts';
import {ALL_GENRES} from '../../consts/genres.ts';
import {FilmProcessState} from '../../types/state.ts';

const initialState: FilmProcessState = {
  films: [],
  activeGenre: ALL_GENRES,
  genreFilms: [],
  currentFilm: null,
  promoFilm: null,
  isLoadingList: true,
  isLoadingFilm: true,
  favoriteFilms: [],
  similarFilms: [],
};

export const filmReducer = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {
    setFilmsByGenre: (state) => {
      state.genreFilms =
          state.activeGenre === ALL_GENRES
            ? state.films
            : state.films.filter((film) => film.genre === state.activeGenre);
    },
    setActiveGenre: (state, action) => {
      state.activeGenre = action.payload as string;
    }
  },
  extraReducers: (builder) => {
    builder
      // .addCase(setActiveGenre, (state, action) => {
      //   const {genre} = action.payload;
      //
      //   state.activeGenre = genre;
      // })
      // .addCase(getFilmsByGenre, (state) => {
      //   state.genreFilms =
      //     state.activeGenre === ALL_GENRES
      //       ? state.films
      //       : state.films.filter((film) => film.genre === state.activeGenre);
      // })
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

      .addCase(fetchFilmPromo.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
      })
      .addCase(fetchFilmPromo.rejected, (state) => {
        state.promoFilm = null;
      })

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
      });
  }
});

export const {setFilmsByGenre, setActiveGenre} = filmReducer.actions;

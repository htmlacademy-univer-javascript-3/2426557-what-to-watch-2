import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../consts/name-space.ts';
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
      // eslint-disable-next-line no-console
      console.log(action.payload);
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
      });
  }
});

export const {setFilmsByGenre, setActiveGenre} = filmsReducer.actions;

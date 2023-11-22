import {createReducer} from '@reduxjs/toolkit';
import {ALL_GENRES} from '../consts/genres.ts';
import {
  getFilmsByGenre,
  loadFilms,
  setActiveGenre,
  setAuthStatus,
  setCurrentFilm,
  setIsLoadingFilm,
  setIsLoadingList,
  setPromoFilm
} from './action.ts';
import {FilmInfoProps, FilmPromo, FilmProps} from '../types/film-types.ts';
import {AuthorizationStatus} from '../enums/AuthorizationStatus.ts';

type initialState = {
  films: FilmProps[];
  activeGenre: string | typeof ALL_GENRES;
  genreFilms: FilmProps[];
  currentFilm: FilmInfoProps | null ;
  promoFilm: FilmPromo | null;
  isLoadingList: boolean;
  isLoadingFilm: boolean;
  authorizationStatus: AuthorizationStatus;
}

const initialState: initialState = {
  films: [],
  activeGenre: ALL_GENRES,
  genreFilms: [],
  currentFilm: null,
  promoFilm: null,
  isLoadingList: true,
  isLoadingFilm: true,
  authorizationStatus: AuthorizationStatus.Unknown,
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
        ? state.films
        : state.films.filter((film) => film.genre === state.activeGenre);
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(setCurrentFilm, (state, action) => {
      state.currentFilm = action.payload;
    })
    // .addCase(loadFilmReviews, (state, action) => {
    //   state.currentFilm = {
    //     ...state.currentFilm,
    //     reviews: action.payload || [],
    //   };
    // })
    .addCase(setIsLoadingList, (state, action) => {
      state.isLoadingList = action.payload;
    })
    .addCase(setIsLoadingFilm, (state, action) => {
      state.isLoadingFilm = action.payload;
    })
    .addCase(setAuthStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

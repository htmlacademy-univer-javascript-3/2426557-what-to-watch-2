import {store} from '../store/index.js';
import {AuthorizationStatus} from '../enums/AuthorizationStatus.ts';
import {UserData} from './auth.ts';
import {ReviewProps} from './review-types.ts';
import {FilmInfoProps, FilmPromo, FilmProps} from './film-types.ts';
import {ALL_GENRES} from '../consts/genres.ts';

export type UserProcessState = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
}

export type FilmsProcessState = {
  films: FilmProps[];
  activeGenre: string | typeof ALL_GENRES;
  genreFilms: FilmProps[];
  promoFilm: FilmPromo | null;
  isLoadingList: boolean;
  favoriteFilms: FilmProps[];
}

export type FilmProcessState = {
  currentFilm: FilmInfoProps | null ;
  isLoadingFilm: boolean;
  similarFilms: FilmProps[];
  reviews: ReviewProps[];
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

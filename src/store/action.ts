import {createAction} from '@reduxjs/toolkit';
// import {FilmInfoProps, FilmPromo, FilmProps} from '../types/film-types.ts';
// import {ReviewProps} from '../types/review-types.ts';
// import {AuthorizationStatus} from '../enums/AuthorizationStatus.ts';
import {AppRoute} from '../enums/AppRoute.ts';

// export const setActiveGenre = createAction<{genre: string}>('setActiveGenre');
//
// export const getFilmsByGenre = createAction('getFilmsByGenre');
//
// export const loadFilms = createAction<FilmProps[]>('fetchFilms');
// export const loadFilmReviews = createAction<ReviewProps[]>('fetchFilmReviews');
// export const loadFavorites = createAction<FilmProps[]>('fetchFavorite');
//
// export const setCurrentFilm = createAction<FilmInfoProps>('fetchFilmById');
// export const setPromoFilm = createAction<FilmPromo>('fetchFilmPromo');
// export const setIsLoadingList = createAction<boolean>('setIsLoadingList');
// export const setIsLoadingFilm = createAction<boolean>('setIsLoadingFilm');
// export const setAuthStatus = createAction<AuthorizationStatus>('checkAuthStatus');
// export const setSimilarFilms = createAction<FilmProps[]>('fetchSimilarFilms');

export const redirectToRoute = createAction<AppRoute | string>('redirectToRoute');

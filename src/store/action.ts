import {createAction} from '@reduxjs/toolkit';
import {FilmInfoProps, FilmPromo, FilmProps} from '../types/film-types.ts';
import {ReviewProps} from '../types/review-types.ts';

export const setActiveGenre = createAction<{genre: string}>('setActiveGenre');

export const getFilmsByGenre = createAction('getFilmsByGenre');

export const loadFilms = createAction<FilmProps[]>('fetchFilms');
export const loadFilmReviews = createAction<ReviewProps[]>('fetchFilmReviews');

export const setCurrentFilm = createAction<FilmInfoProps>('fetchFilmById');
export const setPromoFilm = createAction<FilmPromo>('fetchFilmPromo');
export const setIsLoadingList = createAction<boolean>('setIsLoadingList');
export const setIsLoadingFilm = createAction<boolean>('setIsLoadingFilm');

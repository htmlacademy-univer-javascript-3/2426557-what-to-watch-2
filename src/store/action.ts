import {createAction} from '@reduxjs/toolkit';
import {FilmInfoProps, FilmPromo, FilmProps} from '../types/film-types.ts';

export const setActiveGenre = createAction<{genre: string}>('setActiveGenre');

export const getFilmsByGenre = createAction('getFilmsByGenre');

export const loadFilms = createAction<FilmProps[]>('fetchFilms');

export const setCurrentFilm = createAction<FilmInfoProps>('fetchFilmById');
export const setPromoFilm = createAction<FilmPromo>('fetchFilmPromo');
export const setIsLoading = createAction<boolean>('setIsLoading');

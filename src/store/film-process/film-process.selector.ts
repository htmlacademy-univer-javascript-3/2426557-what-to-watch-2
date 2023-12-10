import {State} from '../../types/state.ts';
import {NameSpace} from '../../consts/name-space.ts';
import {FilmInfoProps, FilmPromo, FilmProps} from '../../types/film-types.ts';

export const getFilm = (state: State): FilmInfoProps | null => state[NameSpace.Film].currentFilm;
export const getFilms = (state: State): FilmProps[] => state[NameSpace.Film].films;
export const getFilmsByGenre = (state: State): FilmProps[] => state[NameSpace.Film].genreFilms;
export const getFilmsByGenreLength = (state: State): number => state[NameSpace.Film].genreFilms.length;
export const getIsLoadingList = (state: State): boolean => state[NameSpace.Film].isLoadingList;
export const getIsLoadingFilm = (state: State): boolean => state[NameSpace.Film].isLoadingFilm;
export const getActiveGenre = (state: State): string => state[NameSpace.Film].activeGenre;
export const getPromoFilm = (state: State): FilmPromo | null => state[NameSpace.Film].promoFilm;

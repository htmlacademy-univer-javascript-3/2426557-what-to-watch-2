import {State} from '../../types/state.ts';
import {NameSpace} from '../../consts/name-space.ts';
import {FilmPromo, FilmProps} from '../../types/film-types.ts';

export const getFilms = (state: State): FilmProps[] => state[NameSpace.Films].films;
export const getFilmsByGenre = (state: State): FilmProps[] => state[NameSpace.Films].genreFilms;
export const getFilmsByGenreLength = (state: State): number => state[NameSpace.Films].genreFilms.length;
export const getIsLoadingList = (state: State): boolean => state[NameSpace.Films].isLoadingList;
export const getActiveGenre = (state: State): string => state[NameSpace.Films].activeGenre;
export const getPromoFilm = (state: State): FilmPromo | null => state[NameSpace.Films].promoFilm;
export const getFavoriteFilms = (state: State): FilmProps[] => state[NameSpace.Films].favoriteFilms;
export const getFavoriteFilmsCount = (state: State): number => state[NameSpace.Films].favoriteFilms?.length || 0;

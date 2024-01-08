import {State} from '../../types/state.ts';
import {NameSpace} from '../../enums/name-space.ts';
import {FilmPromo, FilmProps} from '../../types/film-types.ts';

export const getFilms = (state: Pick<State, NameSpace.Films>): FilmProps[] => state[NameSpace.Films].films;
export const getFilmsByGenre = (state: Pick<State, NameSpace.Films>): FilmProps[] => state[NameSpace.Films].genreFilms;
export const getFilmsByGenreLength = (state: Pick<State, NameSpace.Films>): number => state[NameSpace.Films].genreFilms.length;
export const getIsLoadingList = (state: Pick<State, NameSpace.Films>): boolean => state[NameSpace.Films].isLoadingList;
export const getActiveGenre = (state: Pick<State, NameSpace.Films>): string => state[NameSpace.Films].activeGenre;
export const getPromoFilm = (state: Pick<State, NameSpace.Films>): FilmPromo | null => state[NameSpace.Films].promoFilm;
export const getFavoriteFilms = (state: Pick<State, NameSpace.Films>): FilmProps[] => state[NameSpace.Films].favoriteFilms;
export const getFavoriteFilmsCount = (state: Pick<State, NameSpace.Films>): number => state[NameSpace.Films].favoriteFilms?.length || 0;

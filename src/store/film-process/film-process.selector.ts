import {State} from '../../types/state.ts';
import {NameSpace} from '../../consts/name-space.ts';
import {FilmInfoProps} from '../../types/film-types.ts';
import { ReviewProps } from '../../types/review-types.ts';

export const getFilm = (state: State): FilmInfoProps | null => state[NameSpace.Film].currentFilm;
export const getIsLoadingFilm = (state: State): boolean => state[NameSpace.Film].isLoadingFilm;
export const getReviews = (state: State): ReviewProps[] => state[NameSpace.Film].reviews;

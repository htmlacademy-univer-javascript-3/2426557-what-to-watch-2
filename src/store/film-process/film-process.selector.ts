import {State} from '../../types/state.ts';
import {NameSpace} from '../../consts/name-space.ts';
import {FilmInfoProps} from '../../types/film-types.ts';
import { ReviewProps } from '../../types/review-types.ts';

export const getFilm = (state: Pick<State, NameSpace.Film>): FilmInfoProps | null => state[NameSpace.Film].currentFilm;
export const getIsLoadingFilm = (state: Pick<State, NameSpace.Film>): boolean => state[NameSpace.Film].isLoadingFilm;
export const getReviews = (state: Pick<State, NameSpace.Film>): ReviewProps[] => state[NameSpace.Film].reviews;

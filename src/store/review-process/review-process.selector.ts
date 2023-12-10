import {State} from '../../types/state.ts';
import {NameSpace} from '../../consts/name-space.ts';
import {ReviewProps} from '../../types/review-types.ts';

export const getReviews = (state: Pick<State, NameSpace.Review>): ReviewProps[] => state[NameSpace.Review].reviews;

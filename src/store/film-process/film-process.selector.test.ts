import { NameSpace } from '../../enums/name-space.ts';
import { makeCurrentFilm, makeFilm, makeReview } from '../../utils/mocks';
import { getFilm, getIsLoadingFilm, getReviews } from './film-process.selector';

describe('User process selectors', () => {
  const film = makeCurrentFilm();
  const filmSimilar = makeFilm();
  const review = makeReview();

  const state = {
    [NameSpace.Film]: {
      currentFilm: film,
      isLoadingFilm: true,
      similarFilms: [filmSimilar],
      reviews: [review],
    }
  };

  it('should return film from state', () => {
    const { currentFilm } = state[NameSpace.Film];
    const result = getFilm(state);
    expect(result).toEqual(currentFilm);
  });

  it('should return loading film from state', () => {
    const { isLoadingFilm } = state[NameSpace.Film];
    const result = getIsLoadingFilm(state);
    expect(result).toBe(isLoadingFilm);
  });

  it('should return reviews from state', () => {
    const { reviews } = state[NameSpace.Film];
    const result = getReviews(state);
    expect(result).toEqual(reviews);
  });
});

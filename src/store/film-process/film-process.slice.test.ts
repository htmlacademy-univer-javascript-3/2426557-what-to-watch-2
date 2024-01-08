import { FilmProcessState } from '../../types/state';
import { makeFilm, makeReview } from '../../utils/mocks';
import { fetchFilmById, fetchFilmReviews, fetchSimilarFilms } from '../api-actions';
import { filmReducer } from './film-process.slice';

describe('FilmProcess slice', () => {
  let initialState: FilmProcessState;

  beforeEach(() => {
    initialState = {
      currentFilm: null,
      isLoadingFilm: true,
      similarFilms: [],
      reviews: [],
    };
  });

  it('should return initial state', () => {
    const emptyAction = {type: ''};
    const expectedState = initialState;

    const result = filmReducer.reducer(initialState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  describe('set fetchFilmById test', () => {
    const film = makeFilm();
    it('should fetch film by id films', () => {
      expect(filmReducer.reducer(initialState, { type: fetchFilmById.fulfilled.type, payload: film }).currentFilm)
        .toEqual(film);
    });
    it('should reject fetch film by id films', () => {
      expect(filmReducer.reducer(initialState, { type: fetchFilmById.rejected.type, payload: film }).currentFilm)
        .toEqual(null);
    });
  });

  describe('set isLoadingFilm test', () => {
    it('should set isLoadingFilm true when loading start', () => {
      expect(filmReducer.reducer(initialState, fetchFilmById.pending).isLoadingFilm)
        .toBe(true);
    });
    it('should set isLoadingFilm true when loading end', () => {
      expect(filmReducer.reducer(initialState, fetchFilmById.fulfilled).isLoadingFilm)
        .toBe(false);
    });
    it('should set isLoadingFilm false when loading reject', () => {
      expect(filmReducer.reducer(initialState, fetchFilmById.rejected).isLoadingFilm)
        .toBe(false);
    });
  });

  describe('set fetchSimilar test', () => {
    const films = [makeFilm()];
    it('should fetch similar films', () => {
      expect(filmReducer.reducer(initialState, { type: fetchSimilarFilms.fulfilled.type, payload: films }).similarFilms)
        .toEqual(films);
    });
    it('should reject fetch similar films', () => {
      expect(filmReducer.reducer(initialState, { type: fetchSimilarFilms.rejected.type, payload: films }).similarFilms)
        .toEqual([]);
    });
  });

  describe('set fetchReviews test', () => {
    const reviews = [makeReview()];
    it('should fetch film reviews', () => {
      expect(filmReducer.reducer(initialState, { type: fetchFilmReviews.fulfilled.type, payload: reviews }).reviews)
        .toEqual(reviews);
    });
    it('should reject fetch film reviews', () => {
      expect(filmReducer.reducer(initialState, { type: fetchSimilarFilms.rejected.type, payload: reviews }).reviews)
        .toEqual([]);
    });
  });
});

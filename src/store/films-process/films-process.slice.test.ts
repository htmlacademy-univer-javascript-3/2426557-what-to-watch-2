import { ALL_GENRES } from '../../consts/genres';
import { FilmsProcessState } from '../../types/state';
import { makeFilm, makePromoFilm } from '../../utils/mocks';
import { fetchFavorite, fetchFilmPromo, fetchFilms } from '../api-actions';
import { filmsReducer, setActiveGenre, setFilmsByGenre } from './films-process.slice';

describe('Films process slice', () => {
  let initialState: FilmsProcessState;

  beforeEach(() => {
    initialState = {
      films: [],
      activeGenre: ALL_GENRES,
      genreFilms: [],
      promoFilm: null,
      isLoadingList: false,
      favoriteFilms: [],
      isLoadingPromo: false,
    };
  });

  it('should return initial state', () => {
    const emptyAction = {type: ''};
    const expectedState = initialState;

    const result = filmsReducer.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set active genre in state', () => {
    const emptyAction = {type: ''};
    const expectedState = initialState;

    const result = filmsReducer.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state', () => {
    const state = {
      films: [],
      activeGenre: ALL_GENRES,
      genreFilms: [],
      promoFilm: null,
      isLoadingList: true,
      favoriteFilms: [],
      isLoadingPromo: false,
    };
    const expectedGenre = 'Drama';

    const result = filmsReducer.reducer(state, setActiveGenre('Drama'));

    expect(result.activeGenre).toEqual(expectedGenre);
  });

  it('should return films by active genre from state', () => {
    const film = makeFilm();

    const state = {
      films: [film],
      activeGenre: film.genre,
      genreFilms: [],
      promoFilm: null,
      isLoadingList: true,
      favoriteFilms: [],
      isLoadingPromo: false,
    };
    const expectedFilms = state.films;

    const result = filmsReducer.reducer(state, setFilmsByGenre());

    expect(result.genreFilms).toEqual(expectedFilms);
  });

  it('should return films by all active genre from state', () => {
    const film = makeFilm();

    const state = {
      films: [film],
      activeGenre: ALL_GENRES,
      genreFilms: [],
      promoFilm: null,
      isLoadingList: true,
      favoriteFilms: [],
      isLoadingPromo: false,
    };
    const expectedFilms = state.films;

    const result = filmsReducer.reducer(state, setFilmsByGenre());

    expect(result.genreFilms).toEqual(expectedFilms);
  });

  it('should return films by other active genre from state', () => {
    const film = makeFilm();

    const state = {
      films: [film],
      activeGenre: 'test',
      genreFilms: [],
      promoFilm: null,
      isLoadingList: true,
      favoriteFilms: [],
      isLoadingPromo: false,
    };
    const expectedFilms: unknown[] = [];

    const result = filmsReducer.reducer(state, setFilmsByGenre());

    expect(result.genreFilms).toEqual(expectedFilms);
  });


  describe('set isLoadingList test', () => {
    it('should set isLoadingList true when loading start', () => {
      const expectedState = {
        films: [],
        activeGenre: ALL_GENRES,
        genreFilms: [],
        promoFilm: null,
        isLoadingList: true,
        favoriteFilms: [],
        isLoadingPromo: false,
      };

      expect(filmsReducer.reducer(initialState, fetchFilms.pending))
        .toEqual(expectedState);
    });
    it('should set isLoadingList true when loading end', () => {
      expect(filmsReducer.reducer(initialState, fetchFilms.fulfilled).isLoadingList)
        .toBe(false);
    });
    it('should set isLoadingList true when loading reject', () => {
      expect(filmsReducer.reducer(initialState, fetchFilms.rejected).isLoadingList)
        .toBe(true);
    });
  });

  describe('set fetchFilms test', () => {
    const films = [makeFilm()];
    it('should fetch films', () => {
      expect(filmsReducer.reducer(initialState, { type: fetchFilms.fulfilled.type, payload: films }).films)
        .toEqual(films);
    });
    it('should reject fetch films', () => {
      expect(filmsReducer.reducer(initialState, { type: fetchFilms.rejected.type, payload: films }).films)
        .toEqual([]);
    });
  });

  describe('set fetchFavorite test', () => {
    const films = [makeFilm()];
    it('should fetch favorite films', () => {
      expect(filmsReducer.reducer(initialState, { type: fetchFavorite.fulfilled.type, payload: films }).favoriteFilms)
        .toEqual(films);
    });
    it('should reject fetch favorite films', () => {
      expect(filmsReducer.reducer(initialState, { type: fetchFavorite.rejected.type, payload: films }).favoriteFilms)
        .toEqual([]);
    });
  });

  describe('set fetchPromoFilm test', () => {
    const film = [makePromoFilm()];
    it('should fetch promo film', () => {
      expect(filmsReducer.reducer(initialState, { type: fetchFilmPromo.fulfilled.type, payload: film }).promoFilm)
        .toEqual(film);
    });
    it('should reject promo film', () => {
      expect(filmsReducer.reducer(initialState, { type: fetchFilms.rejected.type, payload: film }).promoFilm)
        .toEqual(null);
    });
  });

});

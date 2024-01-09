import { ALL_GENRES } from '../../consts/genres';
import { NameSpace } from '../../enums/name-space.ts';
import { makeFilm, makePromoFilm } from '../../utils/mocks';
import { getActiveGenre, getFavoriteFilms, getFilms, getFilmsByGenre, getFilmsByGenreLength, getIsLoadingList, getPromoFilm } from './films-process.selector';

describe('User process selectors', () => {
  const film = makeFilm();
  const promoFilmFake = makePromoFilm();

  const state = {
    [NameSpace.Films]: {
      films: [film],
      activeGenre: ALL_GENRES,
      genreFilms: [film],
      promoFilm: promoFilmFake,
      isLoadingList: true,
      favoriteFilms: [film],
      isLoadingPromo: true,
    }
  };

  it('should return films from state', () => {
    const { films } = state[NameSpace.Films];
    const result = getFilms(state);
    expect(result).toEqual(films);
  });

  it('should return films by genre from state', () => {
    const { genreFilms } = state[NameSpace.Films];
    const result = getFilmsByGenre(state);
    expect(result).toEqual(genreFilms);
  });

  it('should return length films by genre from state', () => {
    const { genreFilms } = state[NameSpace.Films];
    const result = getFilmsByGenreLength(state);
    expect(result).toEqual(genreFilms.length);
  });

  it('should return active genre from state', () => {
    const { activeGenre } = state[NameSpace.Films];
    const result = getActiveGenre(state);
    expect(result).toEqual(activeGenre);
  });

  it('should return loading list from state', () => {
    const { isLoadingList } = state[NameSpace.Films];
    const result = getIsLoadingList(state);
    expect(result).toBe(isLoadingList);
  });

  it('should return promo from state', () => {
    const { promoFilm } = state[NameSpace.Films];
    const result = getPromoFilm(state);
    expect(result).toEqual(promoFilm);
  });

  it('should return films by genre from state', () => {
    const { favoriteFilms } = state[NameSpace.Films];
    const result = getFavoriteFilms(state);
    expect(result).toEqual(favoriteFilms);
  });

  it('should return length favorite films from state', () => {
    const { favoriteFilms } = state[NameSpace.Films];
    const result = getFilmsByGenreLength(state);
    expect(result).toEqual(favoriteFilms.length);
  });

});

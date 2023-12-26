import {datatype, name, internet, commerce, lorem} from 'faker';
import { UserData } from '../types/auth';
import { FilmInfoProps, FilmPromo, FilmProps } from '../types/film-types';
import { ReviewProps } from '../types/review-types';

export const makeUser = (): UserData => ({
  id: datatype.number(),
  email: internet.email(),
  token: datatype.uuid(),
  name: name.title(),
  avatarUrl: internet.url(),
} as UserData);

export const makeFilm = (): FilmProps => ({
  id: datatype.uuid(),
  name: name.title(),
  previewImage: internet.url(),
  previewVideoLink: internet.url(),
  genre: name.title(),
  alt: name.title(),
} as FilmProps);

export const makePromoFilm = (): FilmPromo => ({
  id: datatype.uuid(),
  name: name.title(),
  posterImage: internet.url(),
  backgroundImage: internet.url(),
  videoLink: internet.url(),
  genre: name.title(),
  alt: name.title(),
  released: datatype.number(),
  isFavorite: true,
} as FilmPromo);

export const makeCurrentFilm = (): FilmInfoProps => ({
  id: datatype.uuid(),
  name: name.title(),
  posterImage: internet.url(),
  backgroundImage: internet.url(),
  videoLink: internet.url(),
  genre: name.title(),
  alt: name.title(),
  released: datatype.number(),
  isFavorite: true,
  backgroundColor: commerce.color(),
  description: lorem.words(10),
  rating: datatype.number(),
  scoresCount: datatype.number(),
  director: name.title(),
  starring: [name.title()],
  runTime: datatype.number(),
} as FilmInfoProps);

export const makeReview = (): ReviewProps => ({
  id: datatype.uuid(),
  date: datatype.datetime(),
  user: name.title(),
  comment: lorem.words(10),
  rating: datatype.number(),
} as ReviewProps);



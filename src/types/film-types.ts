import { ReviewProps } from './review-types';

export interface FilmProps {
  id: number;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  genre: string;
  alt?: string;
}

export interface FilmPromo {
  id: string;
  name: string;
  posterImage: string;
  backgroundImage: string;
  videoLink: string;
  genre: string;
  released: number;
  isFavorite: boolean;
}

export interface FilmInfoProps extends FilmPromo {
  backgroundColor: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: [string];
  runTime: number;
}

export interface CurrentFilm extends FilmInfoProps {
  reviews?: ReviewProps[];
}


export interface FilmProps {
  id: number;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  genre: string;
  alt?: string;
}

export interface FilmInfoProps extends FilmProps {
  posterImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: [string];
  runTime: number;
  released: number;
  isFavorite: boolean;
}


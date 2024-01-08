import { RatingValue } from '../enums/rating-value';

export const useFilmRating = (rating = 0) => {
  if (rating >= 10) {
    return RatingValue.Awesome;
  } else if (rating >= 8) {
    return RatingValue.VeryGood;
  } else if (rating >= 5) {
    return RatingValue.Good;
  } else if (rating >= 3) {
    return RatingValue.Normal;
  }
  return RatingValue.Bad;
};

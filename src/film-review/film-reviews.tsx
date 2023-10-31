import React from 'react';
import {reviewsInfo} from '../mocks/reviews.ts';
import {ReviewProps} from '../types/review-types.ts';

type FilmReviewsProps = {
  reviews: ReviewProps[];
}
export default function FilmReviews({reviews = reviewsInfo}: FilmReviewsProps): React.JSX.Element {
  return (
    <> {reviews
      .map((review) => (
        review.comment
      ))}
    </>
  );
}

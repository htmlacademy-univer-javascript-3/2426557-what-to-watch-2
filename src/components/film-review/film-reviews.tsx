import React from 'react';
import { ReviewProps } from '../../types/review-types.ts';
import './film-reviews.css';

type FilmReviewsProps = {
  reviews: ReviewProps[];
};

type FilmReviewProps = {
  review: ReviewProps;
};

function Review({ review }: FilmReviewProps): React.JSX.Element {
  return (
    <div className="review" data-testid="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>
        <footer className="review__details">
          <cite className="review__author">{review.user}</cite>
          <time className="review__date" dateTime="Дата отзыва">
            {review.date.toString()}
          </time>
        </footer>
      </blockquote>
      <div className="review__rating">{review.rating}</div>
    </div>
  );
}
function FilmReviews({ reviews = [] }: FilmReviewsProps): React.JSX.Element {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.slice(0, reviews.length / 2).map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </div>
      <div className="film-card__reviews-col">
        {reviews.slice(reviews.length / 2, reviews.length).map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}

const FilmReviewsMemo = React.memo(FilmReviews);

export default FilmReviewsMemo;

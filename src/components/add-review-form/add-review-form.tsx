import React, { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { DEFAULT_FORM_VALUE } from '../../consts/default-form';

type ReviewFormProps = {
  onSubmit: () => void;
};

export default function AddReviewForm({
  onSubmit,
}: ReviewFormProps): React.JSX.Element {
  const RATINGS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [review, setReview] = useState({
    ...DEFAULT_FORM_VALUE,
  });

  function handleRatingChange(evt: ChangeEvent<HTMLInputElement>) {
    setReview({
      ...review,
      rating: Number(evt.target.value),
    });
  }

  function handleTextAreaChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    setReview({
      ...review,
      comment: evt.target.value,
    });
  }

  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
        <div className="rating">
          <div className="rating__stars">
            {RATINGS.map((rating) => (
              <Fragment key={rating}>
                <input
                  className="rating__input"
                  id={`star-${rating}`}
                  type="radio"
                  name="rating"
                  value={rating.toString()}
                  checked={review.rating === rating}
                  onChange={handleRatingChange}
                />
                <label className="rating__label" htmlFor={`star-${rating}`}>
                  Rating {rating}
                </label>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            value={review.comment}
            onChange={handleTextAreaChange}
          />
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              onSubmit={(evt: FormEvent<HTMLButtonElement>) => {
                evt.preventDefault();
                onSubmit();
              }}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

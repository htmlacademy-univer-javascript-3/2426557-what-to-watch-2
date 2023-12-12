import React, {
  ChangeEvent,
  FormEvent,
  Fragment,
  useCallback,
  useState,
} from 'react';
import { DEFAULT_FORM_VALUE } from '../../consts/default-form';
import { addCommentAction } from '../../store/api-actions.ts';
import { useAppDispatch } from '../../hooks/store.ts';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../enums/AppRoute.ts';

type ReviewFormProps = {
  filmId: string;
};

function AddReviewForm({ filmId }: ReviewFormProps): React.JSX.Element {
  const navigate = useNavigate();

  const RATINGS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [review, setReview] = useState({
    ...DEFAULT_FORM_VALUE,
  });

  const dispatch = useAppDispatch();

  const handleRatingChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setReview((currentReview) => ({
        ...currentReview,
        rating: Number(evt.target.value),
      }));
    },
    []
  );

  const handleTextAreaChange = useCallback(
    (evt: ChangeEvent<HTMLTextAreaElement>) => {
      setReview((currentReview) => ({
        ...currentReview,
        comment: evt.target.value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      dispatch(
        addCommentAction({
          filmId: filmId,
          comment: review.comment,
          rating: review.rating,
        })
      ).then(() => {
        navigate(`/films/${filmId}`);
      });
    },
    [dispatch, filmId, navigate, review]
  );

  if (!filmId) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmit}>
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
            <button className="add-review__btn" type="submit">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const AddReviewFormMemo = React.memo(AddReviewForm);

export default AddReviewFormMemo;

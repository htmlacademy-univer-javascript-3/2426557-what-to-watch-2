import './film-card-buttons.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppRoute } from '../../enums/app-route.ts';
import { FormEvent, useEffect } from 'react';
import {
  changeFavoriteStatus,
  fetchFavorite,
  fetchFilmById,
  fetchFilmReviews,
  fetchSimilarFilms,
} from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { FavoriteStatus } from '../../enums/favorite-status.ts';
import { getFavoriteFilmsCount } from '../../store/films-process/films-process.selector';
import { ButtonSize, SmallButtonSize } from '../../enums/button-size.ts';

type FilmCardButtonsProps = {
  isAuth?: boolean;
  isFavorite?: boolean;
  id?: string;
  isReviewButtonVisible?: boolean;
};

export default function FilmCardButtons({
  isAuth = false,
  isFavorite = false,
  id = '',
  isReviewButtonVisible = false,
}: FilmCardButtonsProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const favoriteFilmsCount = useAppSelector(getFavoriteFilmsCount);

  const handleChangeFavorite = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!isAuth) {
      navigate(AppRoute.Login);
    }

    dispatch(
      changeFavoriteStatus({
        status: isFavorite
          ? FavoriteStatus.NoFavorite
          : FavoriteStatus.Favorite,
        filmId: String(id),
      })
    ).then(() => {
      dispatch(fetchFavorite());
    });
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (!id && params.id) {
        dispatch(fetchFilmById(params.id));
        dispatch(fetchSimilarFilms(params.id));
        dispatch(fetchFilmReviews(params.id));
      }
    }

    return () => {
      isMounted = false;
    };
  }, [params.id, dispatch, id]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchFavorite());
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <div className="film-card__buttons">
      <Link
        className="btn btn--play film-card__button"
        type="button"
        to={`${AppRoute.Player}/${id}`}
      >
        <svg
          viewBox="0 0 19 19"
          width={ButtonSize.WIDTH}
          height={ButtonSize.HEIGHT}
        >
          <use xlinkHref="#play-s" />
        </svg>
        <span>Play</span>
      </Link>
      <button
        className="btn btn--list film-card__button"
        type="button"
        onClick={handleChangeFavorite}
      >
        {isFavorite ? (
          <svg
            viewBox="0 0 18 14"
            width={SmallButtonSize.WIDTH}
            height={SmallButtonSize.HEIGHT}
          >
            <use xlinkHref="#in-list"></use>
          </svg>
        ) : (
          <svg
            viewBox="0 0 19 20"
            width={ButtonSize.WIDTH}
            height={ButtonSize.HEIGHT}
          >
            <use xlinkHref="#add"></use>
          </svg>
        )}
        <span>My list</span>
        <span className="film-card__count">{favoriteFilmsCount}</span>
      </button>
      {isAuth && isReviewButtonVisible && (
        <Link
          to={`${AppRoute.Films}/${id}${AppRoute.Review}`}
          className="btn film-card__button"
        >
          Add review
        </Link>
      )}
    </div>
  );
}

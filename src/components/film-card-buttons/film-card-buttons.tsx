import './film-card-buttons.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppRoute } from '../../enums/AppRoute';
import { FormEvent, useEffect } from 'react';
import {
  changeFavoriteStatus,
  fetchFavorite,
  fetchFilmById,
  fetchFilmReviews,
  fetchSimilarFilms,
} from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { FavoriteStatus } from '../../enums/FavoriteStatus';
import { getFavoriteFilmsCount } from '../../store/films-process/films-process.selector';
// import { resetFilmDependencies } from '../../store/film-process/film-process.slice';

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
    if (!id && params.id) {
      dispatch(fetchFilmById(params.id));
      dispatch(fetchSimilarFilms(params.id));
      dispatch(fetchFilmReviews(params.id));
    }
    return () => {
      // dispatch(resetFilmDependencies());
    };
  }, [params.id, dispatch, id]);

  useEffect(() => {
    dispatch(fetchFavorite());
  }, [dispatch]);

  return (
    <div className="film-card__buttons">
      <Link
        className="btn btn--play film-card__button"
        type="button"
        to={`${AppRoute.Player}/${id}`}
      >
        <svg viewBox="0 0 19 19" width={19} height={19}>
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
          <svg viewBox="0 0 18 14" width="18" height="14">
            <use xlinkHref="#in-list"></use>
          </svg>
        ) : (
          <svg viewBox="0 0 19 20" width={19} height={20}>
            <use xlinkHref="#add"></use>
          </svg>
        )}
        {isAuth ? (
          <Link
            to={`${AppRoute.MyList}`}
            className="film-card__link"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            My list
          </Link>
        ) : (
          <span>My list</span>
        )}
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

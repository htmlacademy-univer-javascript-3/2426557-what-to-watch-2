import React, { useLayoutEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AppRoute } from '../../enums/AppRoute';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchFilmById } from '../../store/api-actions';

export default function Player(): React.JSX.Element {
  const { id = '' } = useParams();

  const dispatch = useAppDispatch();
  const film = useAppSelector((state) => state.currentFilm);

  useLayoutEffect(() => {
    if (id) {
      dispatch(fetchFilmById(Number(id)));
    }
  }, [id, dispatch]);

  if (!film) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  return (
    <div className="player">
      <video
        src={film.videoLink}
        className="player__video"
        poster={film.posterImage}
      />
      <Link
        type="button"
        className="player__exit"
        to={`${AppRoute.Films}/${film.id}`}
      >
        Exit
      </Link>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={30} max={100} />
            <div className="player__toggler" style={{ left: '30%' }}>
              Toggler
            </div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>
        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width={19} height={19}>
              <use xlinkHref="#play-s" />
            </svg>
            <span>Play</span>
            {/* Для дальнейшей разработки плеера
            <svg viewBox="0 0 14 21" width={14} height={21}>
              <use xlinkHref="#pause" />
            </svg>
            <span>Pause</span> */}
          </button>
          <div className="player__name">Transpotting</div>
          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width={27} height={27}>
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

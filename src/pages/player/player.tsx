import React, { useEffect, useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AppRoute } from '../../enums/app-route.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchFilmById } from '../../store/api-actions';
import {
  getFilm,
  getIsLoadingFilm,
} from '../../store/film-process/film-process.selector';
import useVideoPlayer from '../../hooks/player';
import { Spinner } from '../../components/spinner/spinner';
import { PADDING } from '../../consts/time';

export default function Player(): React.JSX.Element {
  const { id = '' } = useParams();

  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const isLoading = useAppSelector(getIsLoadingFilm);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const {
    isPlaying,
    progress,
    timeLeft,
    togglePlay,
    handleProgress,
    handleSlider,
    handleFullScreen,
    handleExit,
  } = useVideoPlayer(videoRef, sliderRef);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (id && id !== film?.id) {
        dispatch(fetchFilmById(id));
      }
    }

    return () => {
      isMounted = false;
    };
  }, [id, dispatch, film?.id]);

  if (isLoading) {
    return <Spinner size="large" />;
  }

  if (!film && !id) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  return (
    <div className="player">
      <video
        src={film?.videoLink}
        className="player__video"
        poster={film?.backgroundImage}
        ref={videoRef}
        autoPlay
        onTimeUpdate={handleProgress}
      />
      <button type="button" className="player__exit" onClick={handleExit}>
        Exit
      </button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div
            className="player__time"
            ref={sliderRef}
            onClick={(e) => {
              handleSlider(e.clientX - PADDING);
            }}
          >
            <progress className="player__progress" value={progress} max="100" />
            <div className="player__toggler" style={{ left: `${progress}%` }}>
              Toggler
            </div>
          </div>
          <div className="player__time-value">{timeLeft}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={togglePlay}>
            <svg viewBox="0 0 19 19" width={19} height={19}>
              <use xlinkHref={isPlaying ? '#pause' : '#play-s'} />
            </svg>
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <div className="player__name">{film?.name}</div>
          <button
            type="button"
            className="player__full-screen"
            onClick={handleFullScreen}
          >
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

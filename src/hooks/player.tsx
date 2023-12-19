// import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { PlayerSelector } from 'src/store/player/selectors';
// import { DEFAULT_PERCENT } from '../consts/time';
// import { useAppSelector } from './store';
// import { getLeftTime } from '../utils/time';

// const PADDING = 25;

// export function usePlayer() {
//   const videoLink = useAppSelector(PlayerSelector.videoLink);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [timeLeft, setTimeLeft] = useState<null | string>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const navigate = useNavigate();
//   const handleExit = useCallback(() => {
//     navigate(-1);
//   }, [navigate]);
//   const handleTogglePlay = useCallback(() => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   }, [isPlaying]);
//   const handleToggleFullScreen = useCallback(() => {
//     videoRef.current?.requestFullscreen();
//   }, []);
//   const handleTimeUpdate = useCallback(() => {
//     if (videoRef.current) {
//       const { duration, currentTime } = videoRef.current;
//       const newProgress = (currentTime / duration) * DEFAULT_PERCENT;
//       setProgress(newProgress);
//       setTimeLeft(getLeftTime(duration, currentTime));
//     }
//   }, []);
//   const handleProgressClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
//     if (videoRef.current && sliderRef.current) {
//       const newProgress =
//         (e.clientX - POSITION_CORRECTION) / sliderRef.current.clientWidth;
//       setProgress(newProgress * DEFAULT_PERCENT);
//       videoRef.current.currentTime = videoRef.current.duration * newProgress;
//     }
//   }, []);
//   useEffect(() => {
//     if (progress === DEFAULT_PERCENT) {
//       setIsPlaying(false);
//     }
//   }, [progress]);
//   return {
//     videoRef,
//     videoLink,
//     handleTimeUpdate,
//     handleExit,
//     sliderRef,
//     handleProgressClick,
//     progress,
//     handleTogglePlay,
//     isPlaying,
//     handleToggleFullScreen,
//     timeLeft,
//   };
// }

import { useState } from 'react';
import { DEFAULT_PERCENT } from '../consts/time';

const useVideoPlayer = (
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  sliderRef: React.MutableRefObject<HTMLDivElement | null>
) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (videoRef.current === null) {
      return;
    }
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgress = () => {
    if (videoRef.current === null) {
      return;
    }
    const duration = videoRef.current.duration;
    const currentTime = videoRef.current.currentTime;
    const newProgress = (currentTime / duration) * DEFAULT_PERCENT;
    setProgress(newProgress);
  };

  const handleFullSrceen = () => {
    if (videoRef.current === null) {
      return;
    }
    videoRef.current.requestFullscreen();
  };

  const handleSlider = (clientX: number) => {
    if (videoRef.current === null || sliderRef.current === null) {
      return;
    }
    const newProgress = clientX / sliderRef.current.clientWidth;
    setProgress(newProgress * DEFAULT_PERCENT);
    videoRef.current.currentTime = videoRef.current.duration * newProgress;
  };

  return {
    isPlaying,
    progress,
    togglePlay,
    handleProgress,
    handleSlider,
    handleFullSrceen,
  };
};

export default useVideoPlayer;

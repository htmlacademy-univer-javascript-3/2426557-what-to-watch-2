import React, { useCallback, useState } from 'react';
import { DEFAULT_PERCENT } from '../consts/time';
import { useNavigate } from 'react-router-dom';
import { getLeftTime } from '../utils/time';

const useVideoPlayer = (
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  sliderRef: React.MutableRefObject<HTMLDivElement | null>
) => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState<null | string>(null);

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
    setTimeLeft(getLeftTime(duration, currentTime));
  };

  const handleFullScreen = () => {
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
    handleProgress();
  };

  const handleExit = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return {
    isPlaying,
    progress,
    timeLeft,
    togglePlay,
    handleProgress,
    handleSlider,
    handleFullScreen,
    handleExit,
  };
};

export default useVideoPlayer;

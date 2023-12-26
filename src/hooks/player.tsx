import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_PERCENT, PADDING } from '../consts/time';
import { useNavigate } from 'react-router-dom';
import { getLeftTime } from '../utils/time';

const useVideoPlayer = (
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  sliderRef: React.MutableRefObject<HTMLDivElement | null>,
  togglerRef: React.MutableRefObject<HTMLDivElement | null>
) => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [togglerPosition, setTogglerPosition] = useState(0);
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

  const handleFullSrceen = () => {
    if (videoRef.current === null) {
      return;
    }
    videoRef.current.requestFullscreen();
  };

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);

    document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const handleTogglerMouseDown = useCallback(() => {
    setIsDragging(true);

    if (videoRef.current) {
      videoRef.current.currentTime =
        (togglerPosition / 100) * videoRef.current.duration;
    }

    document.addEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp, togglerPosition]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (
        isDragging &&
        sliderRef.current &&
        togglerRef.current &&
        videoRef.current
      ) {
        const videoWidth = sliderRef.current.clientWidth;
        let mouseX = e.clientX - sliderRef.current.getBoundingClientRect().left;
        mouseX = mouseX < 0 ? 0 : mouseX;
        if (
          mouseX >
          sliderRef.current.getBoundingClientRect().right - PADDING
        ) {
          mouseX = sliderRef.current.getBoundingClientRect().right - PADDING;
        }

        const newTime = (mouseX / videoWidth) * videoRef.current.duration;

        const newTogglerPosition = (newTime / videoRef.current.duration) * 100;
        setTogglerPosition(newTogglerPosition);

        togglerRef.current.style.left = `${newTogglerPosition}%`;
      }
    },
    [isDragging]
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, isDragging]);

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
    handleTogglerMouseDown,
    handleFullSrceen,
    handleExit,
  };
};

export default useVideoPlayer;

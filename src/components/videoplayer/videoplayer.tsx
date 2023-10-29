import React, { useEffect, useRef } from 'react';
import { DEFAULT_AUTOPLAY_TIME } from '../../consts/time';

interface VideoPlayerProps {
  link: string;
  posterImage: string;
  isMuted: boolean;
}
export default function VideoPlayer({
  link,
  posterImage,
  isMuted,
}: VideoPlayerProps): React.JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setTimeout(() => {
      videoRef.current?.play();
    }, DEFAULT_AUTOPLAY_TIME);
  }, []);

  return (
    <video
      ref={videoRef}
      src={link}
      poster={posterImage}
      muted={isMuted}
      className="player__video"
      loop
    >
      <source src={link} type="video/mp4" />
    </video>
  );
}

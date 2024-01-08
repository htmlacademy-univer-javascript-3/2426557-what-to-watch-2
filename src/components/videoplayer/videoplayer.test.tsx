import { render, screen } from '@testing-library/react';
import { internet } from 'faker';
import VideoPlayer from './videoplayer';

describe('Component: VideoPlayer', () => {
  it('should render correctly', () => {
    const mockVideoPath = internet.url();
    const mockPosterPath = internet.url();

    render(
      <VideoPlayer link={mockVideoPath} posterImage={mockPosterPath} isMuted />
    );

    const player = screen.getByTestId('video-player');

    expect(player).toBeInTheDocument();
    expect(player).toHaveAttribute('src', mockVideoPath);
    expect(player).toHaveAttribute('poster', mockPosterPath);

    expect(player).toHaveProperty('loop');
    expect(player).toHaveProperty('muted', true);
  });

  it('should play button enable when data loaded', () => {
    const mockVideoPath = internet.url();
    const mockPosterPath = internet.url();

    render(
      <VideoPlayer link={mockVideoPath} posterImage={mockPosterPath} isMuted />
    );

    const player: HTMLVideoElement = screen.getByTestId('video-player');
    expect(player.paused).toBe(true);

    setTimeout(() => {
      expect(player.paused).toBe(false);
    }, 1000);
  });
});

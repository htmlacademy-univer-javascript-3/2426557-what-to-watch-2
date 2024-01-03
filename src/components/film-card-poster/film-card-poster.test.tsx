import { render, screen } from '@testing-library/react';
import FilmCardPoster from './film-card-poster';

describe('Component: Film card poster', () => {
  it('should render correctly', () => {
    render(<FilmCardPoster />);

    const poster = screen.getByTestId('poster');

    expect(poster).toBeInTheDocument();
    expect(poster).toHaveClass('film-card__poster');
  });

  it('should render the poster image with src and alt text', () => {
    render(<FilmCardPoster src="test.jpg" alt="Film Poster" />);

    const image = screen.getByAltText('Film Poster');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test.jpg');
  });

  it('should render with size class', () => {
    render(<FilmCardPoster size="small" />);

    const poster = screen.getByTestId('poster');

    expect(poster).toBeInTheDocument();
    expect(poster).toHaveClass('film-card__poster--small');
  });
});

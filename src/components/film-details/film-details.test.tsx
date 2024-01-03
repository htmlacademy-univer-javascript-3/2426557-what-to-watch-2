import { render, screen } from '@testing-library/react';
import { makeCurrentFilm } from '../../utils/mocks';
import FilmDetails from './film-details';

describe('Component: FilmDetails', () => {
  it('should render correctly', () => {
    render(<FilmDetails film={makeCurrentFilm()} />);

    expect(screen.getByText(/Director/)).toBeInTheDocument();
    expect(screen.getByText(/Starring/)).toBeInTheDocument();
    expect(screen.getByText(/Run Time/)).toBeInTheDocument();
    expect(screen.getByText(/Genre/)).toBeInTheDocument();
    expect(screen.getByText(/Released/)).toBeInTheDocument();
  });
});

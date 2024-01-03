import { render, screen } from '@testing-library/react';
import { makeCurrentFilm } from '../../utils/mocks';
import Overview from './overview';

describe('Component: Overview', () => {
  it('should render correctly', () => {
    render(<Overview film={makeCurrentFilm()} />);

    expect(screen.getByText(/Director/)).toBeInTheDocument();
    expect(screen.getByText(/Starring/)).toBeInTheDocument();
  });
});

import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Tabs from './tabs';
import { makeCurrentFilm } from '../../utils/mocks';

describe('Component: Tabs', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Tabs film={makeCurrentFilm()} reviews={[]} />
      </BrowserRouter>
    );

    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
  });
});

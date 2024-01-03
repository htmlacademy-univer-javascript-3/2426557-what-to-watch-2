import { render, screen } from '@testing-library/react';
import { makeReview } from '../../utils/mocks';
import FilmReviews from './film-reviews';

describe('Component: FilmReviews', () => {
  it('should render correctly', () => {
    render(<FilmReviews reviews={[makeReview()]} />);

    const expectedCount = 1;

    const reviewValues = screen.getAllByTestId('review');

    expect(reviewValues.length).toBe(expectedCount);
  });
});

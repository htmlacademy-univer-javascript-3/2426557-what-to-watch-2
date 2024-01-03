import { render, screen } from '@testing-library/react';
import { Spinner } from './spinner';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    render(<Spinner size="large" />);

    const spinner = screen.getByTestId('spinner');

    expect(spinner).toHaveClass('spinner-container');
    expect(spinner).toHaveClass('spinner-container--large');
  });
});

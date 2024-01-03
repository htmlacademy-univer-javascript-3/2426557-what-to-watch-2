import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const expectedText = '© 2019 What to watch Ltd.';

    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

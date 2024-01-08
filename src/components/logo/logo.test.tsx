import { BrowserRouter } from 'react-router-dom';
import Logo from './logo';
import { render, screen } from '@testing-library/react';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    );

    const element = screen.getByTestId('logo');

    expect(element).toBeInTheDocument();
  });

  it('should render class correctly', () => {
    render(
      <BrowserRouter>
        <Logo isLight />
      </BrowserRouter>
    );

    const element = screen.getByTestId('logo');

    expect(element).toHaveClass('logo__link--light');
  });

  it('should render logo link correctly', () => {
    render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    );

    const logoChars = screen.getAllByTestId('logo-char');

    expect(logoChars).toHaveLength(3);
    expect(logoChars[0]).toHaveTextContent('W');
    expect(logoChars[1]).toHaveTextContent('T');
    expect(logoChars[2]).toHaveTextContent('W');
  });
});

import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import PageNotFound from './page-not-found';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const expectedHeaderText = 'Ошибка 404. Страница не найдена.';
    const expectedLinkText = 'Вернуться на главную';

    render(withHistory(<PageNotFound />));

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../enums/AppRoute';
import { AuthorizationStatus } from '../../enums/AuthorizationStatus';
import { withHistory } from '../../utils/mock-component';
import PrivateRoute from './private-route';

describe('Component: Private Route', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.MyList);
  });

  it('should render component for public route, when user not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authStatus={AuthorizationStatus.NoAuth}>
              <span>{notExpectedText}</span>
            </PrivateRoute>
          }
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{notExpectedText}</span>} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authStatus={AuthorizationStatus.Auth}>
              <span>{expectedText}</span>
            </PrivateRoute>
          }
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});

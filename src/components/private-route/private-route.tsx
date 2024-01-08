import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../enums/AppRoute';
import React from 'react';
import { AuthorizationStatus } from '../../enums/AuthorizationStatus.ts';

type PrivateRouteProps = {
  authStatus: AuthorizationStatus;
  children: React.JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): React.JSX.Element {
  const { authStatus, children } = props;

  const isAuth = authStatus === AuthorizationStatus.Auth;

  return isAuth ? children : <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;

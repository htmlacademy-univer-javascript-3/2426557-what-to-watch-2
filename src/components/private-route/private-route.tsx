import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../enums/AppRoute';
import React from 'react';

type PrivateRouteProps = {
  children: React.JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): React.JSX.Element {
  const { children } = props;

  const isAuth = true;

  return isAuth ? children : <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;

import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../enums/AppRoute';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { children } = props;

  const isAuth = true;

  return isAuth ? children : <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;

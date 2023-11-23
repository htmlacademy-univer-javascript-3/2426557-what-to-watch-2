import { Link } from 'react-router-dom';
import './user-block.css';
import React, {useCallback} from 'react';
import { AppRoute } from '../../enums/AppRoute';
import {useAppDispatch, useAppSelector} from '../../hooks/store.ts';
import { AuthorizationStatus } from '../../enums/AuthorizationStatus.ts';
import {logoutUser} from '../../store/api-actions.ts';

export default function UserBlock(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const isAuth = authStatus === AuthorizationStatus.Auth;

  const handleClick = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" />
        </div>
      </li>
      <li className="user-block__item">
        {isAuth ? (
          <Link to={`${AppRoute.Login}`} className="user-block__link" onClick={handleClick}>
            Sign out
          </Link>
        ) : (
          <Link to={`${AppRoute.Login}`} className="user-block__link">
            Sign in
          </Link>
        )}
      </li>
    </ul>
  );
}

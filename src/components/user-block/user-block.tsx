import { Link } from 'react-router-dom';
import './user-block.css';
import React from 'react';
import { AppRoute } from '../../enums/AppRoute';
import { useAppSelector } from '../../hooks/store.ts';
import { AuthorizationStatus } from '../../enums/AuthorizationStatus.ts';

export default function UserBlock(): React.JSX.Element {
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const isAuth = authStatus === AuthorizationStatus.Auth;

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" />
        </div>
      </li>
      <li className="user-block__item">
        {isAuth ? (
          <Link to={`${AppRoute.Login}`} className="user-block__link">
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

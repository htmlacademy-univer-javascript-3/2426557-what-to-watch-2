import { Link } from 'react-router-dom';
import './user-block.css';
import React, { useCallback } from 'react';
import { AppRoute } from '../../enums/app-route.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { AuthorizationStatus } from '../../enums/authorization-status.ts';
import { logoutUser } from '../../store/api-actions.ts';
import {
  getAuthStatus,
  getUser,
} from '../../store/user-process/user-process.selector.ts';
import { resetFavoriteFilms } from '../../store/films-process/films-process.slice.ts';

export default function UserBlock(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(getAuthStatus);
  const isAuth = authStatus === AuthorizationStatus.Auth;

  const user = useAppSelector(getUser);

  const handleClick = useCallback(() => {
    dispatch(logoutUser());
    dispatch(resetFavoriteFilms());
  }, [dispatch]);

  return (
    <ul className="user-block">
      {isAuth && user && (
        <li className="user-block__item">
          <div className="user-block__avatar">
            <Link to={`${AppRoute.MyList}`} className="user-block__link">
              <img src={user.avatarUrl} alt="User" />
            </Link>
          </div>
        </li>
      )}
      <li className="user-block__item">
        {isAuth ? (
          <Link
            to={`${AppRoute.Main}`}
            className="user-block__link"
            onClick={handleClick}
          >
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

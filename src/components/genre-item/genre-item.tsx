import React, {FormEvent, useCallback} from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../enums/AppRoute';
import {useAppDispatch} from '../../hooks/store.ts';
import {getFilmsByGenre, setActiveGenre} from '../../store/action.ts';

type GenreItemProps = {
  name: string;
  isActive: boolean;
};
export default function GenreItem({
  name,
  isActive,
}: GenreItemProps): React.JSX.Element {
  const dispatch = useAppDispatch();

  const handleClick = useCallback(
    (event: FormEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      dispatch(setActiveGenre({ genre: name }));
      dispatch(getFilmsByGenre());
    },
    [dispatch, name]
  );

  const computedClass = `catalog__genres-item catalog__genres-item${
    isActive ? '--active' : ''
  }`;

  return (
    <li className={computedClass}>
      <Link to={AppRoute.Main} className="catalog__genres-link" onClick={handleClick}>
        {name}
      </Link>
    </li>
  );
}

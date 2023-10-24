import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../enums/AppRoute';

type GenreItemProps = {
  name: string;
  isActive: boolean;
};
export default function GenreItem({
  name,
  isActive,
}: GenreItemProps): React.JSX.Element {
  const computedClass = `catalog__genres-item catalog__genres-item${
    isActive ? '--active' : ''
  }`;

  return (
    <li className={computedClass}>
      <Link to={AppRoute.Main} className="catalog__genres-link">
        {name}
      </Link>
    </li>
  );
}

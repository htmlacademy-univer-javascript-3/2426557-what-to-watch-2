import React from 'react';
import { Link } from 'react-router-dom';

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
      <Link to="/" className="catalog__genres-link">
        {name}
      </Link>
    </li>
  );
}

import React from 'react';

type GenreProps = {
  name: string;
  isActive: boolean;
}
export default function GenreItem({name, isActive}: GenreProps): React.JSX.Element {
  const computedClass = `catalog__genres-item catalog__genres-item${
    isActive ? '--active' : ''}`;

  return (
    <li className={computedClass}>
      <a href="#" className="catalog__genres-link">
        {name}
      </a>
    </li>
  );
}

import { Link } from 'react-router-dom';
import React from 'react';
import { AppRoute } from '../../enums/app-route.ts';

type Props = {
  isLight?: boolean;
};

function Logo({ isLight = false }: Props): React.JSX.Element {
  const computedClass = `logo__link ${isLight ? 'logo__link--light' : ''}`;

  return (
    <div className="logo">
      <Link to={AppRoute.Main} className={computedClass} data-testid="logo">
        <span className="logo__letter logo__letter--1" data-testid="logo-char">
          W
        </span>
        <span className="logo__letter logo__letter--2" data-testid="logo-char">
          T
        </span>
        <span className="logo__letter logo__letter--3" data-testid="logo-char">
          W
        </span>
      </Link>
    </div>
  );
}

const LogoMemo = React.memo(Logo);

export default LogoMemo;

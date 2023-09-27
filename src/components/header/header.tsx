import Logo from '../logo/logo';
import React from 'react';
import UserBlock from '../user-block/user-block';

export default function Header(): React.JSX.Element {
  return (
    <header className="page-header film-card__head">
      <Logo />
      <UserBlock />
    </header>
  );
}

import Logo from '../logo/logo';
import React from 'react';

export default function Footer(): React.JSX.Element {
  return (
    <footer className="page-footer">
      <Logo isLight />
      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}

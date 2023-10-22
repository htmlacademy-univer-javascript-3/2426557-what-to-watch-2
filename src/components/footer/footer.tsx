import Logo from '../logo/logo';

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

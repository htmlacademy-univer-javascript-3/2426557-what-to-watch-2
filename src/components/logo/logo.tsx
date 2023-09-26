import { Link } from 'react-router-dom';

type Props = {
  color?: string;
};

export default function Logo({ color = '' }: Props): React.JSX.Element {
  const computedClass = `logo__link ${color ? 'logo__link--light' : ''}`;

  return (
    <div className="logo">
      <Link to="/" className={computedClass}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

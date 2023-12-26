import { InfinitySpin } from 'react-loader-spinner';
import './spinner.css';

interface SpinnerProps {
  size?: string;
}

export function Spinner({ size = 'small' }: SpinnerProps): React.JSX.Element {
  return (
    <div className={`spinner-container spinner-container--${size}`}>
      <InfinitySpin width="200" color="#dfcf77" />
    </div>
  );
}

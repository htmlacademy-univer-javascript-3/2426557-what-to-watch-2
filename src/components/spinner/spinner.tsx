import { InfinitySpin } from 'react-loader-spinner';

export function Spinner(): React.JSX.Element {
  return (
    <div className="spinner-container">
      <InfinitySpin width="200" color="#dfcf77" />
    </div>
  );
}

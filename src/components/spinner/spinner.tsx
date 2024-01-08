import { InfinitySpin } from 'react-loader-spinner';
import './spinner.css';
import React from 'react';

interface SpinnerProps {
  size?: string;
}

export function Spinner({ size = 'small' }: SpinnerProps): React.JSX.Element {
  return (
    <div
      className={`spinner-container spinner-container--${size}`}
      data-testid="spinner"
    >
      <InfinitySpin width="200" color="#dfcf77" />
    </div>
  );
}

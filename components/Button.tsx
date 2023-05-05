import React, { FunctionComponent } from 'react';
import { CircularProgress } from '@material-ui/core';

interface ButtonProps {
  onClick: () => void;
  loading: boolean;
  label: string;
  disabled?: boolean;
}

const Button: FunctionComponent<ButtonProps> = ({
  onClick,
  loading,
  label,
  disabled
}) => {
  return (
    <button
      onClick={onClick}
      className={`mt-4 btn primary ${loading ? 'loading' : ''}`}
      disabled={disabled || loading}
    >
      {loading && <CircularProgress color="inherit" size={12} />}
      {!loading && label}
    </button>
  );
};

export default Button;

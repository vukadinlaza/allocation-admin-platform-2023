import { Alert } from '@mui/material';
import React, { useState } from 'react';

export interface StatusInterface {
  type: 'success' | 'error';
  message: string;
}

interface StatusProps {
  status: StatusInterface | null;
  setStatus: (status: StatusInterface | null) => void;
}

const Status: React.FC<StatusProps> = ({ status, setStatus }) => {
  return (
    <>
      {status && (
        <Alert severity={status.type} onClose={() => setStatus(null)}>
          {status.message}
        </Alert>
      )}
    </>
  );
};

export default Status;

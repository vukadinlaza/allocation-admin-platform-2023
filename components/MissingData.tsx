'use client';

import { Card } from '@mui/material';
import Image from 'next/image';

export default function MissingData() {
  return (
    <Card className="card" variant="outlined">
      <Image
        alt="Missing"
        src="/missing.svg"
        className="mb-4 opacity-10"
        width={75}
        height={75}
      />
      <p className="mb-4">Data not found? Contact us to let us know!</p>
      <button className="btn primary">Contact us</button>
    </Card>
  );
}

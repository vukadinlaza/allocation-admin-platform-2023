'use client';

import { Card } from '@mui/material';
import Image from 'next/image';

export default function None({ text }: { text: string }) {
  return (
    <Card className="card" variant="outlined">
      <Image
        alt="None"
        src="/no_file.svg"
        className="mb-4 opacity-10"
        width={75}
        height={75}
      />
      <p>{text || ''}</p>
    </Card>
  );
}

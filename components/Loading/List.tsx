'use client';
import { Grid } from '@mui/material';
import Line from './Line';

export default function List() {
  return (
    <Grid className="w-full" container spacing={1}>
      {Array.from({ length: 6 }).map((x, i) => (
        <Grid item xs={12} key={i}>
          <Line />
        </Grid>
      ))}
    </Grid>
  );
}

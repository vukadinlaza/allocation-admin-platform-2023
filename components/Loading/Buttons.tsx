'use client';
import { Grid } from '@mui/material';
import Line from './Line';

export default function Buttons() {
  return (
    <Grid container spacing={1} className="mb-4">
      <Grid item xs={4}>
        <Line />
      </Grid>
      <Grid item xs={6} />
      <Grid item xs={2}>
        <Line />
      </Grid>
    </Grid>
  );
}

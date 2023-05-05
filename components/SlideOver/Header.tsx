import { Grid, LinearProgress } from '@mui/material';
import dayjs from 'dayjs';
export default function SlideOverHeader({ content }: { content: any }) {
  return (
    <header>
      {content.name && <h1>{content.name}</h1>}
      <Grid container className="my-4">
        <Grid container xs={12}>
          <Grid item xs={6} className="mb-2">
            <p>Total Raised</p>
            <p className="my-1 text-4xl font-medium text-black">$0</p>
          </Grid>
          <Grid item xs={6}>
            <p>Target Raise</p>
            <p className="my-1 text-lg font-medium text-black">$0</p>
          </Grid>
        </Grid>
        <Grid item xs={12} className="my-4">
          <LinearProgress
            variant="determinate"
            value={50}
            sx={{ height: 12, borderRadius: 4 }}
          />
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={6}>
            <p>Wire deadline</p>
            {content.wire_deadline && (
              <p className="my-1 text-lg font-medium text-black">
                {dayjs(content.wire_deadline).format('MMM D, YYYY')}
              </p>
            )}
          </Grid>
          <Grid item xs={6} className="flex items-start justify-end">
            <button className="btn primary">View Deal Page</button>
          </Grid>
        </Grid>
      </Grid>
    </header>
  );
}

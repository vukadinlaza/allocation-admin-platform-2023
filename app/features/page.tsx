'use client';

import { Card } from '@mui/material';

import Box from '@mui/material/Box';
import CircularProgress, {
  CircularProgressProps
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function Features() {
  const features = [
    {
      name: 'Organizations',
      value: 100,
      soon: false,
      text: 'Manage your organizations.'
    },
    {
      name: 'Entities',
      value: 100,
      soon: false,
      text: 'Manage your entities.'
    },
    {
      name: 'Deals',
      value: 80,
      soon: false,
      text: 'Manage all your deals.'
    },
    {
      name: 'Investments',
      value: 0,
      soon: true,
      text: 'Manage all your investiments.'
    },
    {
      name: 'Taxes',
      value: 0,
      soon: true,
      text: 'Manage and generate taxes reports.'
    }
  ];
  return (
    <Card className="features card" variant="outlined">
      <header className="pb-12">
        <div>
          <h1>Features coming</h1>
          <p className="mb-2">
            Follow the progress of the features we are developing at
            Allocations.com in real-time.
          </p>
          <p className="text-base">Last updated: 05/02.</p>
        </div>
        <div className="flex items-center">
          <button className="btn primary">Give us a feedback</button>
        </div>
      </header>
      <main className="grid w-full grid-cols-1 gap-4 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            className="flex flex-col items-center w-full p-6 border rounded-lg"
            key={feature.name}
          >
            <Box className="mb-4">
              <CircularProgressWithLabel size={75} value={feature.value} />
            </Box>
            <p className="mb-2">{feature.name}</p>
            <p className="text-xs text-center opacity-50">{feature.text}</p>
          </div>
        ))}
      </main>
    </Card>
  );
}

import { Grid, TextField } from '@mui/material';
import { useState } from 'react';

interface Item {
  title: string;
  key: string;
}
const items: Item[] = [
  {
    title: 'Management name',
    key: 'manager_name'
  },
  {
    title: 'Advisor name',
    key: 'advisor_name'
  },
  {
    title: 'Fund admin',
    key: 'fund_admin_name'
  }
];

export default function DealTerms() {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <div className="border spvs-form">
      <Grid container>
        {items &&
          items.map((item, index) => (
            <Grid
              key={index}
              container
              xs={12}
              alignItems="center"
              justifyItems="center"
              className="px-4 py-2 border-b"
            >
              <Grid item xs={6}>
                <p className="font-medium text-black">{item.title}</p>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  placeholder={item.title}
                  className="w-full"
                />
              </Grid>
            </Grid>
          ))}
        <Grid item xs={12} className="p-4">
          <button className="btn primary">Save</button>
        </Grid>
      </Grid>
    </div>
  );
}

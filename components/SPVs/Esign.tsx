import { Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material';
import { useState } from 'react';

interface Item {
  title: string;
  key: string;
}
const items: Item[] = [
  {
    title: 'I agree for the Platform Guildelines',
    key: 'agree_platform'
  },
  {
    title: 'I agree to the terms of the Service Agreement',
    key: 'agree_service_agreement'
  },
  {
    title: 'I agree to the terms of the SPV Documents',
    key: 'agree_spv_documents'
  },
  {
    title:
      'Investor capital will be pooled into one or more vehicles to invest in the Company',
    key: 'investor_capital'
  },
  {
    title: 'The SPV is subject to Allocations setup costs',
    key: 'spv_key'
  },
  {
    title: "I'm not a bad actor according to the SEC",
    key: 'agree_sec'
  },
  {
    title: 'I hereby agree to be the Responsible Party for the SPV',
    key: 'responsible_spv'
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
              className="px-4 py-2"
            >
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label={item.title} />
                </FormGroup>
              </Grid>
            </Grid>
          ))}
        <Grid item xs={12} className="p-4">
          <button className="btn primary">E-sign for Submit & Review</button>
        </Grid>
      </Grid>
    </div>
  );
}

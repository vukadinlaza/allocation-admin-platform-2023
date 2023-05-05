import { Grid, TextField } from '@mui/material';
import { useState } from 'react';
import Upload from '../Upload';

interface Item {
  title: string;
  key: string;
}

const items: Item[] = [
  {
    title: 'Entity Legal name',
    key: 'entity_legal_name'
  },
  {
    title: 'EIN',
    key: 'ein'
  },
  {
    title: 'Company Information',
    key: 'company_information'
  },
  {
    title: 'Asset type',
    key: 'asset_type'
  },
  {
    title: 'Instrument',
    key: 'instrument'
  },
  {
    title: 'Target Raise',
    key: 'target_raise'
  },
  {
    title: 'First close date',
    key: 'first_close_date'
  }
];

export default function SPVsForm() {
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
          <h2 className="mb-4 font-medium text-black">
            Upload deals documents
          </h2>
          <Upload />
        </Grid>
        <Grid item xs={12} className="p-4">
          <button className="btn primary">Save</button>
        </Grid>
      </Grid>
    </div>
  );
}

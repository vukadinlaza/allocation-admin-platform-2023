import { Grid, TextField } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

interface Item {
  title: string;
  key: string;
}

interface Template {
  title: string;
  size: number;
  url?: string;
}

const items: Item[] = [
  {
    title: 'Management fee',
    key: 'management_fee'
  },
  {
    title: 'Carry fee',
    key: 'carry_fee'
  },
  {
    title: 'Minimum investment',
    key: 'minimum_investment'
  },
  {
    title: 'Offering type',
    key: 'offering_type'
  }
];

const templates: Template[] = [
  {
    title: 'Operating agreement',
    size: 2.4
  },
  {
    title: 'Subscription agreement',
    size: 4.5
  },
  {
    title: 'Private placement memorandum',
    size: 4.5
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
          <header className="flex items-center justify-between mb-4">
            <h2 className="mb-4 font-medium text-black">Legal templates</h2>
            <button className="btn primary">Upload custom</button>
          </header>
          <div className="overflow-hidden bg-gray-100 border rounded-lg">
            {templates &&
              templates.map((template, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 transition border-b cursor-pointer hover:bg-gray-200"
                >
                  <div>
                    {' '}
                    <Image
                      src="/attach.svg"
                      alt={'Add File'}
                      className="cursor-pointer text-primary"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="w-full text-sm text-left text-gray-500">
                    {template.title}
                  </div>
                  <div>
                    <button className="border btn info">Generate</button>
                  </div>
                </div>
              ))}
          </div>
        </Grid>
        <Grid item xs={12} className="p-4">
          <button className="btn primary">Save</button>
        </Grid>
      </Grid>
    </div>
  );
}

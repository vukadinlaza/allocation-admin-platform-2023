'use client';

import { headers_tables } from '@/app/config';
import LoadingButtons from '@/components/Loading/Buttons';
import LoadingList from '@/components/Loading/List';
import PageList from '@/components/PageList';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { useAuthContext } from './context';

export default function Dashboard() {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuthContext();

  const getFullName = () => {
    if (!user) return '';
    if (user?.infos?.first_name) return user.infos.first_name;
    return user.email;
  };

  const getHeader = () => {
    return {
      name: 'SPVs',
      description: 'Manage your spvs.',
      buttons: [
        {
          title: 'Create new'
        }
      ]
    };
  };

  return (
    <Grid container className="home">
      {loading && (
        <div className="w-full">
          <LoadingButtons />
          <LoadingList />
        </div>
      )}
      {!loading && (
        <Grid item xs={12}>
          {/* <Grid item xs={12}>
            <h1 className="mb-4">Welcome back {getFullName()}!</h1>
          </Grid> */}
          <Grid item xs={12}>
            <PageList
              header={getHeader()}
              headersTable={headers_tables.spvs}
              table="deals"
              query={`*`}
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

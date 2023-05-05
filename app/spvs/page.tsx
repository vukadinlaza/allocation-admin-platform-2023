'use client';

import { headers_tables } from '@/app/config';
import PageList from '@/components/PageList';

export default function SPVs() {
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
    <PageList
      header={getHeader()}
      headersTable={headers_tables.spvs}
      type="spvs"
      queryType="spv"
      table="deals"
      query={`*`}
    />
  );
}

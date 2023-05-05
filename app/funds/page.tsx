'use client';

import { headers_tables } from '@/app/config';
import PageList from '@/components/PageList';

export default function Funds() {
  const getHeader = () => {
    return {
      name: 'Funds',
      description: 'Manage your funds.',
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
      headersTable={headers_tables.funds}
      table="deals"
      queryType="fund"
      query={`*`}
    />
  );
}

'use client';

import { headers_tables } from '@/app/config';
import PageList from '@/components/PageList';

export default function Deals() {
  const getHeader = () => {
    return {
      name: 'Investments',
      description: 'Manage investments.',
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
      headersTable={headers_tables.investments}
      table="investments"
      query={`*`}
    />
  );
}

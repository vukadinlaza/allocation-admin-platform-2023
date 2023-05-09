'use client';

import { headers_tables } from '@/app/config';
import PageList from '@/components/PageList';

export default function Taxes() {
  const getHeader = () => {
    return {
      name: 'Taxes',
      description: 'Manage taxes.',
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
      headersTable={headers_tables.organizations}
      table="taxes"
      query={`*, entities ( * )`}
    />
  );
}

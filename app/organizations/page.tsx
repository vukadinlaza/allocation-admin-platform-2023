'use client';

import { headers_tables } from '@/app/config';
import PageList from '@/components/PageList';

export default function Organizations() {
  const getHeader = () => {
    return {
      name: 'Organizations',
      description: 'Manage your organizations.',
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
      table="organizations"
      query={`*, entities ( * )`}
    />
  );
}

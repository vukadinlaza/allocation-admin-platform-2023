'use client';

import { headers_tables } from '@/app/config';
import PageList from '@/components/PageList';

export default function Entities() {
  const getHeader = () => {
    return {
      name: 'Entities',
      description: 'Manage your entities.',
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
      headersTable={headers_tables.entities}
      table="limited_entities"
      query={`*`}
    />
  );
}

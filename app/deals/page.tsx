'use client';

import { headers_tables } from '@/app/config';
import PageList from '@/components/PageList';

export default function Deals() {
  const getHeader = () => {
    return {
      name: 'Deals',
      description: 'Manage deals.',
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
      headersTable={headers_tables.deals}
      table="deals"
      type="deals"
      query={`*, entities ( * )`}
    />
  );
}

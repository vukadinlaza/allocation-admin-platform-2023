export const navigation = [
  // { name: 'Home', href: '/' },
  { name: 'Taxes', href: '/taxes' },
  // { name: 'Funds', href: '/funds', showCount: true },
  // { name: 'Organizations', href: '/organizations', showCount: true },
  // { name: 'Entities', href: '/entities', showCount: true },
  { name: 'Investments', href: '/investments' },
  { name: 'Deals', href: '/deals' }
];

export const headers_tables = {
  deals: [
    {
      label: 'Deal display name',
      key: 'name'
    },
    {
      label: 'Status',
      key: 'status'
    },
    {
      label: 'Created at',
      key: 'created_at'
    },
    {
      label: 'EIN',
      key: 'entities',
      sub_key: 'ein'
    }
  ],
  entities: [
    {
      label: 'Name',
      key: 'name'
    },
    {
      label: 'Tax status',
      key: 'tax_status'
    },
    {
      label: 'Updated date',
      key: 'created_at'
    },
    {
      label: 'EIN',
      key: 'ein'
    }
  ],
  funds: [
    {
      label: 'Name',
      key: 'name'
    },
    {
      label: 'Company name',
      key: 'company_name'
    },
    {
      label: 'Entity name',
      key: 'entity_name'
    },
    {
      label: 'Portfolio company name',
      key: 'portfolio_company_name'
    },
    {
      label: 'Status',
      key: 'status'
    }
  ],
  investments: [
    {
      label: 'Deal name',
      key: 'name'
    },
    {
      label: 'Subscription amount',
      key: 'subscription_amount'
    },
    {
      label: 'Capital wired amount',
      key: 'capital_wired_amount'
    },
    {
      label: 'Status',
      key: 'status'
    },
    {
      label: 'Updated at',
      key: 'created_at'
    }
  ],
  organizations: [
    {
      label: 'Name',
      key: 'name'
    },
    {
      label: 'Status',
      key: 'status'
    },
    {
      label: 'E-mail',
      key: 'email'
    },
    {
      label: 'Creation date',
      key: 'created_at'
    },
    {
      label: 'Total Entities',
      key: 'entities'
    }
  ],
  spvs: [
    {
      label: 'SPV name',
      key: 'name'
    },
    {
      label: 'Company name',
      key: 'company_name'
    },
    {
      label: 'Entity name',
      key: 'entity_name'
    },
    {
      label: 'Portfolio company name',
      key: 'portfolio_company_name'
    },
    {
      label: 'EIN',
      key: 'ein'
    },
    {
      label: 'Status',
      key: 'status'
    }
  ]
};

import Tabs from '@/components/Tabs';
import { useState } from 'react';
import DealTerms from './DealTerms';
import Esign from './Esign';
import Form from './Form';
import Roles from './Roles';

const spvs_overview_tabs = [
  {
    title: 'Basic info',
    disabled: false,
    component: Form
  },
  {
    title: 'Deals terms',
    disabled: false,
    component: DealTerms
  },
  {
    title: 'Roles',
    disabled: false,
    component: Roles
  },
  {
    title: 'E-sign & submit',
    disabled: false,
    component: Esign
  }
];

export default function Overview() {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <div className="overview">
      <div>
        <div className="flex items-center justify-center w-full h-48 my-8 bg-primary">
          <p className="text-white">Logo here</p>
        </div>
        <Tabs tabs={spvs_overview_tabs} />
      </div>
    </div>
  );
}

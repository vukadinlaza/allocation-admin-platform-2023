'use client';

import MissingData from '@/components/MissingData';
import None from '@/components/None';
import DealsSliveOver from './Deals';
import SPVSSlideOver from './SPVs';

export default function SlideOverContent({
  data,
  setOpen
}: {
  data: any;
  setOpen: any;
}) {
  const content = data.data;
  const getComponent = (data: any) => {
    const { type } = data;
    if (!type) return <MissingData />;
    if (type === 'spvs') return <SPVSSlideOver data={data} setOpen={setOpen} />;
    if (type === 'deals')
      return <DealsSliveOver data={data} setOpen={setOpen} />;
    return <None text="Not available yet. Please try again later." />;
  };
  return (
    <div className="slideover">
      {!data && !content && <MissingData />}
      {data && content && (
        <div className="slideover--component">{getComponent(data)}</div>
      )}
    </div>
  );
}

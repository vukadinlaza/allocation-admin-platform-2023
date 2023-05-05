import DealsForm from '@/components/Deals/Form';
export default function DealsSliveOver({
  data,
  setOpen
}: {
  data: any;
  setOpen: any;
}) {
  const content = data.data;
  return <DealsForm content={content} setOpen={setOpen} />;
}

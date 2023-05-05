import Button from '@/components/Button';
import supabase from '@/lib/supabase';
import { Deal } from '@/types';
import { Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import Status, { StatusInterface } from '../Status';

export default function DealsForm({
  content,
  setOpen
}: {
  content: any;
  setOpen: any;
}) {
  const [_deal, setDeal] = useState<Deal | any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<StatusInterface | null>(null);

  const items = [
    { key: 'user_email', label: 'User email', type: 'string' },
    { key: 'accept_crypto', label: 'Accept Crypto', type: 'boolean' },
    { key: 'asset_type', label: 'Asset Type', type: 'string' },
    { key: 'carry_fee', label: 'Carry Fee', type: 'string' },
    { key: 'closing_date', label: 'Closing Date', type: 'string' },
    { key: 'closed', label: 'Closed', type: 'boolean' },
    { key: 'company_name', label: 'Company Name', type: 'string' },
    { key: 'deal_term', label: 'Deal Term', type: 'string' },
    { key: 'documents', label: 'Documents', type: 'string' },
    { key: 'elevated_returns', label: 'Elevated Returns', type: 'boolean' },
    {
      key: 'international_investors',
      label: 'International Investors',
      type: 'boolean'
    },
    { key: 'invited_investors', label: 'Invited Investors', type: 'string' },
    {
      key: 'legacy_manager_email',
      label: 'Legacy Manager Email',
      type: 'string'
    },
    {
      key: 'legacy_manager_name',
      label: 'Legacy Manager Name',
      type: 'string'
    },
    {
      key: 'legacy_organization_name',
      label: 'Legacy Organization Name',
      type: 'string'
    },
    { key: 'management_fee', label: 'Management Fee', type: 'string' },
    {
      key: 'management_fee_dollar',
      label: 'Management Fee Dollar',
      type: 'string'
    },
    {
      key: 'management_fee_frequency',
      label: 'Management Fee Frequency',
      type: 'string'
    },
    {
      key: 'management_fee_percent',
      label: 'Management Fee Percent',
      type: 'string'
    },
    {
      key: 'management_fee_type',
      label: 'Management Fee Type',
      type: 'string'
    },
    { key: 'manager_email', label: 'Manager Email', type: 'string' },
    { key: 'manager_type', label: 'Manager Type', type: 'string' },
    { key: 'minimum_investment', label: 'Minimum Investment', type: 'string' },
    { key: 'mongo_id', label: 'Mongo ID', type: 'string' },
    {
      key: 'mongo_organization_id',
      label: 'Mongo Organization ID',
      type: 'string'
    },
    { key: 'name', label: 'Name', type: 'string' },
    { key: 'offering_type', label: 'Offering Type', type: 'string' },
    { key: 'onboarding_link', label: 'Onboarding Link', type: 'string' },
    { key: 'owner_mongo_id', label: 'Owner Mongo ID', type: 'string' },
    {
      key: 'portfolio_company_name',
      label: 'Portfolio Company Name',
      type: 'string'
    },
    { key: 'series_name', label: 'Series Name', type: 'string' },
    { key: 'setup_cost', label: 'Setup Cost', type: 'string' },
    { key: 'side_letters', label: 'Side Letters', type: 'boolean' },
    { key: 'sign_deadline', label: 'Sign Deadline', type: 'string' },
    { key: 'status', label: 'Status', type: 'string' },
    { key: 'target', label: 'Target', type: 'string' },
    { key: 'target_raise_goal', label: 'Target Raise Goal', type: 'string' },
    { key: 'total_carry', label: 'Total Carry', type: 'string' },
    { key: 'total_round_size', label: 'Total Round Size', type: 'string' },
    { key: 'type', label: 'Type', type: 'string' },
    { key: 'wire_deadline', label: 'Wire Deadline', type: 'string' }
  ];

  const saveDeal = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('deals')
        .upsert(_deal, { onConflict: 'id' })
        .select();

      if (data) {
        console.log(data);
        setStatus({ type: 'success', message: 'Deal saved.' });
        setOpen(false);
      }
      if (error) {
        setStatus({ type: 'error', message: "Sorry, couldn't update." });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Sorry, please try again.' });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => setStatus(null), 6000);
  }, [status]);

  useEffect(() => {
    if (content) {
      delete content.entities;
      setDeal(content);
    }
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <header>
          <h1>{content.name || 'No name'}</h1>
        </header>
      </Grid>
      <Grid item xs={12}>
        {items &&
          items.map((item, index) => (
            <Grid
              key={index}
              container
              xs={12}
              alignItems="center"
              justifyItems="center"
              className="px-4 py-4 border-b"
            >
              <Grid item xs={6}>
                <p className="font-medium text-black">{item.label}</p>
              </Grid>
              <Grid item xs={6}>
                {item.type === 'string' && (
                  <TextField
                    disabled={loading}
                    size="small"
                    placeholder={item.label}
                    className="w-full"
                    value={_deal[item.key] || ''}
                    onChange={(event) =>
                      setDeal({
                        ..._deal,
                        [item.key]: event.target.value
                      })
                    }
                  />
                )}
              </Grid>
            </Grid>
          ))}
      </Grid>
      <Grid item xs={12} className="mt-4">
        {status && <Status status={status} setStatus={setStatus} />}
        {!status && (
          <Button onClick={saveDeal} loading={loading} label="Save Deal" />
        )}
      </Grid>
    </Grid>
  );
}

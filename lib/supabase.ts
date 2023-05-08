import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

export const fetchUser = async (email: string | undefined) => {
  if (!email) return;
  const { data } = await supabase
    .from('users')
    .select(`*`)
    .eq('email', email)
    .single();
  return data || null;
};

export const fetchOrganizations = async () => {
  return await supabase
    .from('limited_organizations')
    .select(`*`, { count: 'exact' })
    .order('created_at', { ascending: false });
};

export const fetchEntities = async () => {
  return await supabase.from('entities').select(`*`, { count: 'exact' });
};

export const fetchDeals = async (type: string | null = null) => {
  if (type) {
    return await supabase
      .from('deals')
      .select(`*`, { count: 'exact' })
      .eq('type', type);
  }
  return await supabase.from('deals').select(`*`, { count: 'exact' });
};

export const fetchInvestments = async () => {
  return await supabase.from('investments').select(`*`, { count: 'exact' });
};

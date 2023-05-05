export interface Deal {
  id: string;
  created_at?: string;
  updated_at?: string;
  accept_crypto?: boolean;
  asset_type?: string;
  carry_fee?: string;
  closing_date?: string;
  closed?: boolean;
  company_name?: string;
  deal_term?: string;
  documents?: string;
  elevated_returns?: boolean;
  entity_id?: string;
  entity_name?: string;
  international_investors?: boolean;
  invited_investors?: string;
  legacy_manager_email?: string;
  legacy_manager_name?: string;
  legacy_organization_name?: string;
  management_fee?: string;
  management_fee_dollar?: string;
  management_fee_frequency?: string;
  management_fee_percent?: string;
  management_fee_type?: string;
  manager_email?: string;
  manager_type?: string;
  minimum_investment?: string;
  mongo_id?: string;
  mongo_organization_id?: string;
  name?: string;
  offering_type?: string;
  onboarding_link?: string;
  owner_mongo_id?: string;
  portfolio_company_name?: string;
  series_name?: string;
  setup_cost?: string;
  side_letters?: boolean;
  sign_deadline?: string;
  status?: string;
  target?: string;
  target_raise_goal?: string;
  total_carry?: string;
  total_round_size?: string;
  type?: string;
  wire_deadline?: string;
  user_email?: string;
}

export type DealKeys = keyof Deal;

export type DealType = Deal[DealKeys];

export interface Entity {
  id?: string;
  created_at?: string;
  name?: string;
  organization_name?: string;
  organization_id?: string;
  mongo_organization_id?: string;
  mongo_deal_id?: string;
  ein?: string;
  user_email?: string;
  fund_manager?: string;
  tax_status?: string;
  return_id?: string;
  is_migration?: boolean;
  deals?: Deal[] | null;
}

type Investment = {
  mongo_investment_id?: string;
  mongo_deal_id?: string;
  mongo_user_id?: string;
  capital_wired_amount?: number | null;
  subscription_amount?: number;
  ledger_matched?: boolean | null;
  management_fee_percent?: number | null;
  carry?: number | null;
  spv_fees?: number | null;
  bluesky_fees?: number | null;
  management_fees_dollars?: number | null;
  private_fund_expenses?: number | null;
  other_expenses_2022?: number | null;
  net_investment?: number | null;
  completed_at?: string;
  invited_at?: string;
  status?: string;
  updated_at?: string;
};

export interface Migration {
  legal_entity_id?: string;
  name?: string;
  organization_id?: string;
  ein?: string;
  organization_name?: string;
}

export interface Organization {
  id?: string;
  created_at?: string;
  updated_at?: string;
  status?: string;
  mongo_id?: string;
  name?: string;
  slug?: string;
  approved?: string;
  high_volume_partner?: boolean;
  legal_name?: string;
  mou_signed?: boolean;
  phase?: string;
  entities?: Organization[] | null;
  deals?: Deal[] | null;
}

export interface TabData {
  title: string;
  component?: React.ComponentType;
  disabled?: boolean;
}

export interface UserInfos {
  id?: null | string;
  created_at?: string | Date;
  updated_at?: string | Date;
  email?: string;
  first_name?: string;
  last_name?: string;
  investor_type?: null | string;
  is_super_admin?: boolean;
  mongo_id?: string;
}

export interface UserOrganization {
  id?: string;
  created_at?: string;
  organization_id?: string | null;
  is_admin?: boolean | null;
  organization_mongo_id?: string | null;
  invite?: boolean | null;
  user_mongo_id?: string | null;
  user_email?: string | null;
  organizations?: Organization[] | null;
}

export interface UserSession {
  created_at?: string;
  email?: string;
  first_name?: string;
  id?: string | null;
  investor_type?: string | null;
  is_super_admin?: boolean;
  last_name?: string;
  mongo_id?: string;
  updated_at?: string;
}

export interface UserInterface extends UserSession {
  deals?: Deal[] | null;
  entities?: Entity[] | null;
  currentOrganization?: string | null;
  infos?: UserInfos | null;
  is_super_admin?: boolean;
  organizations?: Organization[] | null;
  users_organizations?: UserOrganization[] | undefined;
}

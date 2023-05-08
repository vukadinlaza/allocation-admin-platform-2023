'use client';

import { navigation } from '@/app/config';
import { useAuthContext } from '@/app/context';
import supabase from '@/lib/supabase';
import { Organization } from '@/types';
import { Search } from '@mui/icons-material';
import { Chip, InputAdornment, TextField } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import AvatarComponent from './AvatarOld';
import Feedback from './Feedback';
import Logo from './Logo';
import SearchBox from './SearchBox/SearchBox';

interface HeaderProps {
  loading: boolean;
}

export default function Header({ loading }: HeaderProps) {
  const pathname = usePathname();
  const { user, setCurrentOrganization } = useAuthContext();
  const [counts, setCounts]: any = useState(null);

  const getCount = async () => {
    const organizations = await supabase
      .from('organizations')
      .select('*', { count: 'exact' })
      .then(({ count }) => count);

    const entities = await supabase
      .from('limited_entities')
      .select('*', { count: 'exact' })
      .then(({ count }) => count);

    const deals = await supabase
      .from('deals')
      .select('*', { count: 'exact' })
      .then(({ count }) => count);

    const investments = await supabase
      .from('investments')
      .select('*', { count: 'exact' })
      .then(({ count }) => count);

    const spvs = await supabase
      .from('deals')
      .select('*', { count: 'exact' })
      .eq('type', 'spv')
      .then(({ count }) => count);

    const funds = await supabase
      .from('deals')
      .select('*', { count: 'exact' })
      .eq('type', 'fund')
      .then(({ count }) => count);

    console.log({
      organizations,
      investments,
      entities,
      deals,
      spvs,
      funds
    });

    setCounts({
      organizations,
      investments,
      entities,
      deals,
      spvs,
      funds
    });
  };

  useEffect(() => {
    getCount();
  }, []);

  return (
    <div className="header">
      <div className="header--main">
        <div>
          <Logo url={'/allocations_logo.svg'} />
        </div>
        <div className="flex items-center justify-end w-full grow">
          {loading && (
            <div
              className="flex items-center justify-end grow"
              style={{ maxWidth: '300px' }}
            >
              <div className="w-32 h-4 mr-2 rounded-lg loading" />
              <div className="w-8 h-8 rounded-full loading" />
            </div>
          )}
          {!loading && (
            <div className="flex items-center justify-end ml-4 grow">
              {user && (
                <div className="flex items-center justify-between">
                  {user.infos && (
                    <div className="mx-2">
                      {user.infos.is_super_admin && (
                        <Chip
                          size="small"
                          color="info"
                          className="font-bold text-white"
                          label="Admin"
                        ></Chip>
                      )}
                    </div>
                  )}
                  {user && <SearchBox />}
                  <Feedback />
                  <div className="mr-2 select">
                    <select
                      onChange={(e) => setCurrentOrganization(e.target.value)}
                    >
                      {user.organizations && user.organizations.length < 1 && (
                        <option selected>
                          {user.infos.is_super_admin
                            ? 'All organizations'
                            : 'No organization'}
                        </option>
                      )}
                      {user.organizations &&
                        user.organizations.length > 0 &&
                        user.organizations.map((organization: Organization) => (
                          <option
                            className="text-xs"
                            key={organization.id}
                            value={organization.id}
                          >
                            {organization.name ||
                              organization.legal_name ||
                              'No organization found'}
                          </option>
                        ))}
                    </select>
                  </div>
                  <AvatarComponent />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="header--sub">
        {loading && (
          <div className="flex items-center">
            {Array.from({ length: 6 }).map((x, i) => (
              <div key={i} className="w-32 h-5 mr-2 rounded-lg loading" />
            ))}
          </div>
        )}
        {!loading &&
          navigation &&
          navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              <div
                className={`header--menu--item ${
                  pathname?.includes(item.name.toLowerCase())
                    ? 'active'
                    : 'inactive'
                }`}
              >
                <span className="mr-1">{item.name}</span>
                {counts && item.showCount && (
                  <span>({counts[item.name.toLowerCase()] || 0})</span>
                )}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

'use client';

import { useAuthContext } from '@/app/context';
import LoadingList from '@/components/Loading/List';
import supabase from '@/lib/supabase';
import { Search } from '@mui/icons-material';
import { Alert, Card, Grid, InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import List from './List';
import MissingData from './MissingData';
import None from './None';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { navigation } from '@/app/config';
import classNames from 'classnames';
import { useQuery } from 'react-query';

interface PageListInterface {
  header?: any;
  headersTable?: any;
  table: string;
  type?: string;
  query: string;
  queryType?: string;
}

export default function PageList({
  header,
  headersTable,
  table,
  type,
  query,
  queryType
}: PageListInterface) {
  const [search, setSearch] = useState<string | null>(null);
  const pathname = usePathname();
  const { push } = useRouter();

  const { user } = useAuthContext();

  const { data: initialData, isLoading: initialLoading } = useQuery(
    [table, query, queryType],
    async () => {
      if (!user || !table) return [];
      const { data: _data, count }: any = await supabase
        .from(table)
        .select(query ?? `*`, { count: 'exact' })
        .order('created_at', { ascending: true });

      if (_data && _data.length > 0) {
        return _data;
      }
      return [];
    }
  );

  const { data: results, isLoading: searchLoading } = useQuery(
    ['search', table, search],
    async () => {
      if (!user || !search) return [];
      const { data: _results }: { data: any } = await supabase
        .from(table)
        .select()
        .ilike('name', `%${search || ''}%`);
      // .eq('type', type);

      if (_results && _results.length > 0) {
        return _results;
      }
      return [];
    },
    {
      enabled: !!search && search.length > 0,
      refetchOnWindowFocus: false
    }
  );

  return (
    <main style={{ display: 'flex', alignItems: 'stretch' }}>
      <aside className="lg:col-span-3 lg:py-0 lg:px-3 lg:py-0">
        <select
          onChange={(e) => push(e.target.value)}
          className="lg:hidden w-full rounded-md border-0 text-sm leading-5 h-10 focus:border-0 focus:ring-0"
        >
          {navigation.map(({ name, href }) => (
            <option key={name} value={href} selected={pathname === href}>
              {name}
            </option>
          ))}
        </select>
        <nav className="space-y-1 hidden lg:block">
          {navigation.map(({ name, href }) => (
            <Link
              className={classNames(
                pathname === href
                  ? 'bg-sky-200 text-blue-700 '
                  : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50',
                'group rounded-md px-3 py-2 flex items-center font-medium text-sm'
              )}
              key={href}
              href={href}
            >
              <span className="truncate">{name}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <Card style={{ width: '100%' }} className="card" variant="outlined">
        <header>
          <div>
            <h1 className="mb-2">
              <span className="mr-2">{header.name || 'No title'}</span>
              {initialData && (
                <div className="chip chip--small chip--info">
                  {initialData?.length}
                </div>
              )}
            </h1>
            <p>{header.description || 'No description'}</p>
          </div>
          <div>
            {header.buttons &&
              header.buttons.map((button: any) => (
                <button key={button.title} disabled className="btn primary">
                  {button.title}
                </button>
              ))}
          </div>
        </header>
        <Grid container xs={12} className="mb-6">
          <Grid item xs={8}>
            <TextField
              id="outlined-start-adornment"
              size="small"
              placeholder="Search for spvs..."
              sx={{ width: '300px' }}
              onInput={(e: any) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          {/* {user && user.infos && user.infos.is_super_admin && (
            <Grid item xs={4} className="mb-4">
              <Alert severity="success">
                As an admin, you can look & edit for any {table}.
              </Alert>
            </Grid>
          )} */}
        </Grid>
        <Grid container>
          {(initialLoading || searchLoading) && (
            <Grid item xs={12} className="w-full">
              <LoadingList />
            </Grid>
          )}
          {!initialLoading && !searchLoading && (
            <Grid item xs={12} className="w-full">
              {search && (
                <div className="onsearch">
                  {!results?.length && <MissingData />}
                  {results?.length > 0 && (
                    <List type={type} headers={headersTable} data={results} />
                  )}
                </div>
              )}
              {!search && (
                <div>
                  {initialData.length < 1 && (
                    <None text={`No ${type} yet. Create one?`} />
                  )}
                  {initialData.length > 0 && (
                    <List
                      type={type}
                      headers={headersTable}
                      data={initialData}
                    />
                  )}
                </div>
              )}
            </Grid>
          )}
        </Grid>
      </Card>
    </main>
  );
}

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
  const [initialData, setInitialData] = useState<Array<any>>([]);
  const [results, setResults] = useState<Array<any>>([]);
  const [initialDataCount, setInitialDataCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterKeys, setFilterKeys] = useState<Array<any>>([]);

  const { user } = useAuthContext();

  const fetchData = async () => {
    if (!user || !table) return;
    try {
      setLoading(true);

      let request = supabase
        .from(table)
        .select(query ?? `*`, { count: 'exact' })
        .order('created_at', { ascending: true });

      if (queryType) {
        request = request.eq('type', queryType);
      }

      let { data: _data, count }: any = await request;

      if (_data && _data.length > 0) {
        setInitialData(_data);
        if (count) setInitialDataCount(count);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = async () => {
    if (!user && !search) return;
    try {
      setLoading(true);
      let { data: _results }: { data: any } = await supabase
        .from(table)
        .select()
        .textSearch('name', search || '', {
          type: 'websearch'
        })
        .eq('type', type);

      if (_results && _results.length > 0) {
        setResults(_results);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search && search.length > 0) {
      setLoading(true);
      const _search = setTimeout(() => {
        //     onSearch();
        const filtered = initialData.filter((x) => {
          for (const key of filterKeys) {
            if (!x[key]) return false;
            if (x[key].toLowerCase().includes(search.toLowerCase())) {
              return true;
            }
          }
          return false;
        });
        setResults(filtered);
        setLoading(false);
        return;
      }, 1000);
      return () => clearTimeout(_search);
    }
    setResults([]);
    setLoading(false);
  }, [search]);

  useEffect(() => {
    fetchData();
    if (headersTable) {
      setFilterKeys(headersTable.map((header: any) => header.key));
    }
  }, []);

  return (
    <main>
      <Card className="card" variant="outlined">
        <header>
          <div>
            <h1 className="mb-2">
              <span className="mr-2">{header.name || 'No title'}</span>
              <div className="chip chip--small chip--info">
                {initialDataCount}
              </div>
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
          {user && user.infos && user.infos.is_super_admin && (
            <Grid item xs={4} className="mb-4">
              <Alert severity="success">
                As an admin, you can look & edit for any {table}.
              </Alert>
            </Grid>
          )}
        </Grid>
        <Grid container>
          {loading && (
            <Grid item xs={12} className="w-full">
              <LoadingList />
            </Grid>
          )}
          {!loading && (
            <Grid item xs={12} className="w-full">
              {search && (
                <div className="onsearch">
                  {!results.length && <MissingData />}
                  {results.length > 0 && (
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

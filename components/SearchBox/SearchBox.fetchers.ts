import supabase from '@/lib/supabase';

export enum SearchQueryKey {
  SearchView = 'SearchView'
}

export const searchDeals = async ({ query }: { query: string }) => {
  const response = await supabase
    .from('deals')
    .select(`company_name`)
    .ilike('company_name', `%${query}%`);
  // .returns<
  //   Pick<
  //     DealPageView,
  //     "title" | "deal_images" | "unique_share_link" | "is_active" | "handle"
  //   >
  // >();
  return response;
};

export const searchUsers = async ({ query }: { query: string }) => {
  const response = await supabase
    .from('users')
    .select('*')
    .or(`first_name.ilike.%${query}%, last_name.ilike.%${query}%`);

  return response;
};

// combine both fetchers into one
export const search = async ({ query }: { query: string }) => {
  const [deals, users] = await Promise.all([
    searchDeals({ query }),
    searchUsers({ query: query })
  ]);
  return { deals, users };
};

// export const invalidateSearchViews = (queryClient: QueryClient) => {
//   queryClient.invalidateQueries(SearchQueryKey.SearchView);
// };

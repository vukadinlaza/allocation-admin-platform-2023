import React, { useRef, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import Avatar from '../Avatar';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/app/context';
import { search, SearchQueryKey } from './SearchBox.fetchers';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';
import classNames from 'classnames';

export default function SearchBox() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthContext();

  const {
    data: searchResult,
    refetch,
    isFetching
  } = useQuery({
    queryKey: [SearchQueryKey.SearchView, query],
    queryFn: () => search({ query: query }),
    onError: (err) => {
      console.log('err', err);
    },
    enabled: false
  });

  // use debounce to trigger reftch for search
  const goSearch = _.debounce(() => {
    refetch();
  }, 200);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    goSearch();
  };

  return (
    <section className="max-w-[650px] w-full mx-auto">
      <div className="w-full" ref={containerRef}>
        <Combobox
          onChange={(href: string) => {
            router.push(href);
          }}
        >
          {({ open }) => (
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"></path>
                </svg>
              </div>
              <Combobox.Input
                onChange={onChange}
                className={classNames(
                  'block w-full rounded-t-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:ring-transparent focus:border-gray-300 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none sm:text-sm z-[200]',
                  open ? 'rounded-t-md rounded-b-none' : 'rounded-md'
                )}
                placeholder="Search users, deals"
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2"></Combobox.Button>
              <Transition.Root
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options className="absolute z-10 mt-1 max-h-100 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  <>
                    {isFetching && (
                      <div className="py-4 px-2">
                        <Combobox.Label className="text-gray-500 text-xs leading-4 font-semibold px-2">
                          Users
                        </Combobox.Label>
                        <div className="space-y-3 flex flex-col">
                          <SkeletonLoading type="user" />
                          <SkeletonLoading type="user" />
                          <SkeletonLoading type="user" />
                        </div>

                        <Combobox.Label className="text-gray-500 text-xs leading-4 font-semibold px-2 mt-3">
                          Deals
                        </Combobox.Label>
                        <div className="space-y-3 flex flex-col">
                          <SkeletonLoading type="deal" />
                          <SkeletonLoading type="deal" />
                          <SkeletonLoading type="deal" />
                        </div>
                      </div>
                    )}
                    {(searchResult?.users || searchResult?.deals) && (
                      <Combobox.Options
                        static
                        className="max-h-72 md:max-h-96 lg:max-h-[562px] scroll-py-2 overflow-y-auto pb-2 px-2 py-4"
                      >
                        <>
                          {!isFetching && searchResult?.users?.data && (
                            <>
                              <Combobox.Label className="text-gray-500 text-xs leading-4 font-semibold px-2">
                                Users
                              </Combobox.Label>
                              {searchResult.users.data.length > 0 && (
                                <>
                                  <span className="mt-3 mb-2">
                                    {searchResult.users.data.map(
                                      (user, index) => (
                                        <Combobox.Option
                                          key={index + '' + user.handle}
                                          value={`${user.email}`}
                                          className="cursor-default select-none "
                                        >
                                          <UserRowCard
                                            key={index}
                                            firstName={user.first_name}
                                            lastName={user.last_name}
                                            avatar={user?.profile_pic_url}
                                          />
                                        </Combobox.Option>
                                      )
                                    )}
                                  </span>
                                </>
                              )}
                              {searchResult.users.data.length == 0 && (
                                <p className="text-xs leading-4 font-normal text-gray-500 px-2 mt-3 mb-4">
                                  No results in your search
                                </p>
                              )}
                            </>
                          )}
                        </>
                        {/* {!isFetching && searchResult?.deals?.data && (
                          <>
                            <Combobox.Label className="text-gray-500 text-xs leading-4 font-semibold px-2">
                              Deals
                            </Combobox.Label>
                            {searchResult.deals.data.length > 0 && (
                              <>
                                <span className="mt-3 mb-2">
                                  {searchResult.deals.data.map(
                                    (deal, index) => (
                                      <Combobox.Option
                                        key={index}
                                        value={
                                          deal.is_active
                                            ? `/deal/${deal.handle}/${deal.unique_share_link}`
                                            : `/deal/${deal.handle}`
                                        }
                                        className="cursor-default select-none "
                                      >
                                        <DealRowCard
                                          key={index}
                                          title={deal.title!}
                                          status={deal.is_active}
                                          // sort deal_images by order index
                                          dealImage={
                                            deal.deal_images?.sort(
                                              (a, b) =>
                                                (a.order_index || 0) -
                                                (b.order_index || 0)
                                            )[0]?.image_url || null
                                          }
                                        />
                                      </Combobox.Option>
                                    )
                                  )}
                                </span>
                              </>
                            )}
                            {searchResult.deals.data.length == 0 && (
                              <p className="text-xs leading-4 font-normal text-gray-500 px-2 mt-3 mb-1">
                                No results in your connections
                              </p>
                            )}
                          </>
                        )} */}
                      </Combobox.Options>
                    )}
                  </>
                </Combobox.Options>
              </Transition.Root>
            </div>
          )}
        </Combobox>
      </div>
    </section>
  );
}

type UserRowCardProps = {
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  connected?: boolean;
};
const UserRowCard = ({
  firstName,
  lastName,
  avatar,
  connected
}: UserRowCardProps) => {
  function getFullName({
    firstName,
    lastName
  }: {
    firstName: string;
    lastName?: string | null;
  }): string {
    return lastName ? `${firstName} ${lastName}` : firstName;
  }

  return (
    <div className="flex items-center gap-2 hover:bg-gray-100 p-2 group/item cursor-pointer">
      <Avatar
        size={32}
        src={avatar!}
        firstName={firstName!}
        lastName={lastName!}
        placeholder="blur"
        // blurDataURL={`data:image/svg+xml;base64,${toBase64(
        //   createBlurUrl(32, 32)
        // )}`}
      />
      <div className="flex justify-between w-full">
        <p className="text-sm leading-5 font-normal text-gray-900 flex items-center gap-2">
          {getFullName({
            firstName: firstName!,
            lastName: lastName
          })}{' '}
        </p>
      </div>
    </div>
  );
};

const SkeletonLoading = ({ type }: { type: 'deal' | 'user' }) => (
  <div className="flex items-center gap-2 bg-gray-100 mt-2 rounded-2xl p-2 group/item cursor-pointer w-full">
    {type === 'deal' && (
      <Skeleton height={32} width={32} className="rounded-lg h-8 w-8" />
    )}
    {type === 'user' && (
      <Skeleton
        height={25}
        width={32}
        circle
        className="rounded-full h-8 w-8 bg-red-500"
      />
    )}
    <Skeleton
      height={24}
      width={500}
      className="w-full bg-red-500"
      style={{ width: '100%' }}
      containerClassName="flex-1"
    />
  </div>
);

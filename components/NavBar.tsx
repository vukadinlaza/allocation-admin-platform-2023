import { Fragment } from 'react';
import DropdownMenu from './DropdownMenu';
import { Organization } from '@/types';
import { useRouter } from 'next/navigation';
import { Menu, Transition } from '@headlessui/react';
import { useAuthContext } from '@/app/context';
import SearchBox from './SearchBox/SearchBox';
import Logo from './Logo';
import { useQuery } from 'react-query';
import supabase from '@/lib/supabase';

export function NavBar() {
  const { user, signOut, setCurrentOrganization } = useAuthContext();

  const {
    data: organizations,
    isLoading,
    error
  } = useQuery('organizations', async () => {
    const { data: _data, count } = await supabase
      .from('organizations')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: true });

    if (_data && _data.length > 0) {
      return _data;
    }

    return [];
  });

  return (
    <>
      <header className="pt-4 pb-[14px] bg-white border-b border-b-slate-200 min-h-full">
        <div className="max-w-7xl mx-auto lg:px-8 sm:px-6 px-4">
          <nav className="flex justify-between items-center">
            <div className="lg:pr-0 md:pr-6 pr-4">
              {/* Website Logo */}
              <div className="relative  flex-shrink-0">
                <div className="h-10 w-10">
                  <Logo url={'/allocations_logo.svg'} />
                </div>
                {!user && (
                  <h1 className=" text-2xl leading-8 font-semibold text-green-700">
                    ALLOCATIONS
                  </h1>
                )}
              </div>
            </div>
            {user && <SearchBox />}
            <div className="mr-2 select">
              <select
                onChange={(e) => setCurrentOrganization(e.target.value)}
                style={{ maxWidth: '150px' }}
                className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                {organizations && organizations.length < 1 && (
                  <option selected>
                    {user.is_super_admin
                      ? 'All organizations'
                      : 'No organization'}
                  </option>
                )}
                {organizations &&
                  organizations.length > 0 &&
                  organizations.map((organization: Organization) => (
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
            <>
              {/* A valid user */}
              {user !== null && (
                <>
                  <div className="hidden md:flex items-center lg:space-x-6 space-x-5 lg:pl-0 md:pl-6 pl-4 flex-shrink-0">
                    <DropdownMenu logout={() => signOut()} />
                    <Menu as="div" className="relative inline-block text-left ">
                      <>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-[-75px] z-10 mt-2 w-[400px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none h-auto"></Menu.Items>
                        </Transition>
                      </>
                    </Menu>
                  </div>
                </>
              )}
            </>
          </nav>
        </div>
      </header>
    </>
  );
}

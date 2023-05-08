import React from 'react';
import { Fragment, forwardRef } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthContext } from '@/app/context';
import classNames from 'classnames';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Avatar from './Avatar';

export default function DropdownMenu({ logout }: { logout: () => void }) {
  const { user } = useAuthContext();
  const NavLinks = [
    { label: 'Settings', url: '/account', openInNewTab: false }
  ];

  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        <Menu.Button className="inline-flex w-full justify-center focus:outline-none ">
          <div className="flex items-center space-x-[4.5px]">
            <Avatar
              src={user?.infos?.profile_pic_url!}
              size={32}
              firstName={user?.infos?.first_name! || user.email}
              lastName={user?.infos?.last_name! || user.email}
            />
            <span className="text-green-700">
              <svg
                width="11"
                height="7"
                viewBox="0 0 11 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.01411 5.86216C5.28267 6.13071 5.7188 6.13071 5.98735 5.86216L10.1124 1.73716C10.3809 1.4686 10.3809 1.03247 10.1124 0.763917C9.8438 0.495362 9.40767 0.495362 9.13911 0.763917L5.49966 4.40337L1.86021 0.766064C1.59165 0.49751 1.15552 0.49751 0.886963 0.766064C0.618408 1.03462 0.618408 1.47075 0.886963 1.73931L5.01196 5.86431L5.01411 5.86216Z"
                  fill="#15803D"
                />
              </svg>
            </span>
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-[241px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="pt-6 flex justify-center flex-col border-b-1  border-b-gray-200">
            <div className="w-full text-center flex items-center justify-center">
              <Avatar
                src={user?.infos?.profile_pic_url!}
                size={70}
                firstName={user?.infos?.first_name! || user.email}
                lastName={user?.infos?.last_name! || user.email}
              />
            </div>
            <p className="text-base leading-6 font-medium text-center py-1">
              {user?.first_name} {user?.last_name}
            </p>

            <p className="text-xs leading-4 font-normal text-center pb-2">
              {user?.is_sponsor === true ? 'Sponsor' : 'Investor'}
            </p>

            {user && user?.current_org_id && (
              <div className="flex gap-2 items-center py-3 px-4">
                <div
                  className="w-[20px] h-[20px] bg-gradient-to-r from-[#166534] to-[#1BD05F] rounded-full mr-2"
                  style={{
                    background:
                      'linear-gradient(287.2deg, #166534 7.5%, #1BD05F 92.91%)'
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="border-t-1 border-t-gray-200">
            <Menu.Item>
              <button
                type="submit"
                className={classNames(
                  'w-full px-3 py-4 text-sm flex gap-[14px] text-red-700 hover:bg-gray-100 hover:text-red-900'
                )}
                onClick={logout}
              >
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className=" text-base font-normal w-5 h-5 mr-2"
                />
                <p className="text-sm leading-5 font-normal">Sign Out</p>
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

import { useEffect } from 'react';
import Link from 'next/link';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faComment } from "@fortawesome/free-regular-svg-icons";
// import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
// import { faBell } from "@fortawesome/pro-regular-svg-icons";
import DropdownMenu from './DropdownMenu';
import { Organization } from '@/types';
import { useRouter } from 'next/router';
// import NotificationMenu from "./NotificationMenu";
import { Menu, Transition } from '@headlessui/react';
import { useAuthContext } from '@/app/context';
import SearchBox from './SearchBox/SearchBox';
import AvatarComponent from './AvatarOld';
import Logo from './Logo';
// import SearchBox from "./SearchBox";
// import { useSupabaseClient } from "@supabase/auth-helpers-react";
// import LoginOrSignupModal from "../auth_modal/LoginOrSignupModal";
// import EditProfileModal from "www/pages/profile/EditProfileModal";
// import { useQuery } from 'react-query';
// import {
//   fetchUnseenMessagesCount,
//   NotificationQueryKey,
//   fetchNotifications,
// } from "./NotificationMenu.fetchers";
import { Fragment, useState, forwardRef } from 'react';
// import { classNames } from "www/shared/utils";
// import NotificationNumber from "./NotificationNumber";
// import { homeFeedStep, welcomeStep } from "www/pages/deal/DealTourProvider";
// import Image from "next/future/image";

interface NavLinkProps {
  label: string;
  href: string;
}

interface HeaderProps {
  loading: boolean;
}

export function NavBar({ loading }: HeaderProps) {
  // const router = useRouter();
  const { user, signOut, setCurrentOrganization } = useAuthContext();
  // const userProfile = useGlobalState((s) => s.userProfile);
  // const setGlobalState = useGlobalState((s) => s.setGlobalState);
  // const clientSupabase = useSupabaseClient();
  // const isAuthModalOpen = useGlobalState((s) => s.isAuthModalOpen);
  // const isUpdateModalOpen = useGlobalState((s) => s.isUpdateModalOpen);
  // const authModalVariant = useGlobalState((s) => s.authModalVariant);
  // const processLogout = async () => {
  //   const { error } = await clientSupabase.auth.signOut();
  //   console.log('Logging out:', error);
  //   setGlobalState({ supabaseUser: null, userProfile: null });
  //   router.push('/');
  // };
  // const setOpenAuthModal = (open: boolean) => {
  //   setGlobalState({ isAuthModalOpen: open });
  // };
  // const setUpdateModalOpen = (open: boolean) => {
  //   setGlobalState({ isUpdateModalOpen: open });
  // };

  // const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  // const [isMobileNotificationMenuOpen, setIsMobileNotificationMenuOpen] =
  //   useState(false);

  // useEffect(() => {
  //   document.body.style.overflow = isMobileNavOpen ? 'hidden' : 'unset';
  // }, [isMobileNavOpen]);

  // const public_routes: string[] = [
  //   '/deal/[handle]/[access]',
  //   '/deal/[handle]/e/[email_hash]'
  // ];
  // const isReferralPageOnly = public_routes.includes(router.route);

  // const { data: unseenMessagesCount } = useQuery({
  //   queryKey: [NotificationQueryKey.UnreadInboxMessages, supabaseUser?.id],
  //   queryFn: () => fetchUnseenMessagesCount(supabaseUser?.id!),
  //   onError: (err) => {
  //     console.log('err', err);
  //   },
  //   refetchInterval: 1000 * 60, // refetch every minute
  //   refetchIntervalInBackground: false,
  //   enabled: !!supabaseUser?.id
  // });

  // Grabbing the number of unread notifications
  // const { data: res } = useQuery({
  //   queryKey: [NotificationQueryKey.NotificationView, supabaseUser?.id],
  //   queryFn: () => fetchNotifications(supabaseUser?.id!),
  //   onError: (err) => {
  //     console.log('err', err);
  //   },
  //   enabled: !!supabaseUser?.id
  // });

  // const toggleMobileNav = () => {
  //   setIsMobileNavOpen((prev) => {
  //     // document.body.classList.toggle("overflow-hidden", !prev);
  //     return !prev;
  //   });
  // };

  // const toggleMobileNotificationMenu = () => {
  //   setIsMobileNotificationMenuOpen((prev) => {
  //     // document.body.classList.toggle("overflow-hidden", !prev);
  //     return !prev;
  //   });
  //   // document.body.classList.toggle("overflow-hidden", isMobileNavOpen);
  // };

  // const unSeenNotifications =
  //   res?.data?.notifications?.filter((n) => n.is_seen === false).length ||
  //   0 +
  //     (res?.data?.connection_requests?.filter((n) => n.is_seen === false)
  //       .length || 0);

  // const MobileNavLinks = [
  //   {
  //     label: 'Your Profile',
  //     url: `/p/${userProfile?.handle}`
  //   },
  //   { label: 'Deal Dashboard', url: '/account/deals' },
  //   { label: 'Settings', url: '/account' }
  // ];
  return (
    <>
      {/* {!supabaseUser && (
        <LoginOrSignupModal
          open={isAuthModalOpen}
          setOpen={setOpenAuthModal}
          variant={authModalVariant}
        />
      )}
      {userProfile && (
        <EditProfileModal
          profile={userProfile}
          isOpen={isUpdateModalOpen || !userProfile.handle}
          setIsOpen={setUpdateModalOpen}
          referral={true}
        />
      )} */}

      <header className="pt-4 pb-[14px] bg-white border-b border-b-slate-200 min-h-full">
        <div className="max-w-7xl mx-auto lg:px-8 sm:px-6 px-4">
          <nav className="flex justify-between items-center">
            <div className="lg:pr-0 md:pr-6 pr-4">
              {/* Website Logo */}
              <div className="relative  flex-shrink-0">
                {/* <Link href={'/'}> */}
                {/* <a
                    className="flex items-center gap-4"
                    // data-tour={homeFeedStep}
                  > */}
                <div className="h-10 w-10">
                  <Logo url={'/allocations_logo.svg'} />
                </div>
                {!user && (
                  <h1 className=" text-2xl leading-8 font-semibold text-green-700">
                    ALLOCATIONS
                  </h1>
                )}
                {/* </a> */}
                {/* </Link> */}
              </div>
            </div>
            {user && !loading && <SearchBox />}
            <div className="mr-2 select">
              <select onChange={(e) => setCurrentOrganization(e.target.value)}>
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
            <>
              {/* A valid user */}
              {user !== null && (
                <>
                  <div className="hidden md:flex items-center lg:space-x-6 space-x-5 lg:pl-0 md:pl-6 pl-4 flex-shrink-0">
                    <DropdownMenu logout={() => signOut()} />
                    {/* <AvatarComponent /> */}
                    {/* <Link href="/inbox">
                      <a className="relative mr-1.5">
                        <FontAwesomeIcon
                          icon={faComment}
                          className="hover:text-gray-500 text-gray-400 w-6 h-6"
                        /> 
                        {unseenMessagesCount !== null &&
                          unseenMessagesCount !== 0 && (
                            <NotificationNumber amount={unseenMessagesCount} />
                          )}
                      </a>
                    </Link> */}
                    <Menu as="div" className="relative inline-block text-left ">
                      <>
                        <div>
                          <Menu.Button className="mr-1.5 relative">
                            {/* <FontAwesomeIcon
                              icon={faBell}
                              className="hover:cursor-pointer hover:text-gray-500 text-gray-400 w-[21px] h-6"
                            /> */}
                            {/* {unSeenNotifications > 0 && (
                              <NotificationNumber
                                amount={unSeenNotifications}
                              />
                            )} */}
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

'use client';
import Header from '@/components/Header';
import Login from '@/components/Login';
import { NavBar } from '@/components/NavBar';
import SlideOver from '@/components/SlideOver';
import supabase from '@/lib/supabase';
import {
  Deal,
  Entity,
  Organization,
  UserInterface,
  UserOrganization,
  UserSession
} from '@/types';
import { SpaceDashboardOutlined } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Collapse, IconButton } from '@mui/material';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext({});

// TODO: Temporary solution to merge from one query
// later will write accured policies to fetch related sources

const mergeOrganizations = (users_organizations: UserOrganization[] | any) => {
  if (!users_organizations) return [];
  return users_organizations.map((org: UserOrganization) => {
    let _org = {
      ...org,
      ...org.organizations
    };
    delete _org.organizations;
    return _org;
  });
};

const mergeEntities = (organizations: Organization[]) => {
  let entities: Entity[] = [];
  organizations.forEach((organization: Organization) => {
    if (organization.entities) {
      entities.push(...organization.entities);
    }
  });
  return entities;
};

const mergeDeals = (organizations: Organization[], entities: Entity[]) => {
  let deals: Deal[] = [];
  organizations.forEach((organization: Organization) => {
    if (organization.deals) {
      deals.push(...organization.deals);
    }
  });
  entities.forEach((entity: Entity) => {
    if (entity.deals) {
      deals.push(...entity.deals);
    }
  });
  // remove duplicates
  const uniqueArray = deals.filter((obj, index, array) => {
    return index === array.findIndex((item) => item.id === obj.id);
  });
  return uniqueArray;
};

const buildUser = (
  sessionUser: UserSession | any,
  user: UserInterface | any
) => {
  if (!sessionUser) return;
  let finalUser: UserInterface = { ...sessionUser };
  if (user) {
    const { users_organizations } = user;
    const organizations = mergeOrganizations(users_organizations);
    const entities = mergeEntities(organizations);
    const deals = mergeDeals(organizations, entities);
    // users deals missing
    if (users_organizations) {
      finalUser = {
        ...finalUser,
        organizations,
        entities,
        deals,
        infos: user,
        is_super_admin: user.is_super_admin || false,
        currentOrganization: organizations ? organizations[0].id : null
      };
    }
  }
  return finalUser;
};

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [betaAlert, hasBetaAlert] = useState(true);
  const [slideOverData, setSlideOverData] = useState({});

  const fetchUser = async (user: any) => {
    const { email } = user;
    if (!email) return;
    try {
      const { data } = await supabase
        .from('users')
        .select(
          `*,
          users_organizations (
            *,
            organizations (
              *,
              deals (
                *
              ),
              entities (
                *,
                deals (
                  *
                )
              )
            )
          )`
        )
        .eq('email', email)
        .single();

      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const response = await supabase.auth.signOut();
      if (response) {
        setUser(null);
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setSlideOver = (isOpen: boolean, data: any, type: string) => {
    if (!type && !data) return;
    setOpen(isOpen);
    setSlideOverData({ data, type });
  };

  const onAuthStateChange = async () => {
    try {
      setLoading(true);
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (session && session.user) {
        // merge session.user + user + users_organizations
        const users_infos = await fetchUser(session.user);
        // build current user, TODO: type UserInterface later
        const build: any = await buildUser(session.user, users_infos);

        console.log(build);
        setUser(build);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onAuthStateChange();
  }, []);

  const value = useMemo(() => {
    return {
      user,
      open,
      setCurrentOrganization: (orgId: string) =>
        setUser((prev: any) => ({ ...prev, currentOrganization: orgId })),
      setSlideOver,
      signOut
    };
  }, [user]);

  return (
    <AuthContext.Provider value={value}>
      {/* {user && <Header loading={loading} />} */}
      {user && <NavBar loading={loading} />}
      <div>
        {!user && !loading && (
          <div className="my-12">
            <Login />
          </div>
        )}
        {user && (
          <div className="px-5 my-6">
            {/* <Collapse in={betaAlert}>
              <Alert
                className="mb-6 "
                icon={<SpaceDashboardOutlined className=" text-primary" />}
                severity="success"
                action={
                  <IconButton
                    aria-label="close"
                    color="primary"
                    size="small"
                    onClick={() => {
                      hasBetaAlert(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" className="text-primary" />
                  </IconButton>
                }
              >
                <h2 className="mt-0">Welcome to Allocations v2.0 !</h2>
                <span>
                  Welcome to our beta fund administration platform, where you
                  can experience the latest features and help us shape the
                  future of our new product.
                </span>
              </Alert>
            </Collapse> */}
            {children}
            <SlideOver open={open} setOpen={setOpen} data={slideOverData} />
          </div>
        )}
      </div>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const { user, open, setSlideOver, setCurrentOrganization, signOut }: any =
    useContext(AuthContext);
  return { user, open, setSlideOver, setCurrentOrganization, signOut };
};

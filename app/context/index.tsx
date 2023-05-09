'use client';
// import AlertsBeta from '@/components/Alerts/Beta';
import Header from '@/components/Header';
import LoadingApp from '@/components/Loading/App';
import Login from '@/components/Login';
import { NavBar } from '@/components/NavBar';
import SlideOver from '@/components/SlideOver';
import supabase, {
  fetchDeals,
  fetchEntities,
  fetchInvestments,
  fetchOrganizations,
  fetchUser
} from '@/lib/supabase';
import { Deal, Entity, Investment, Organization } from '@/types';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: { children: any }) => {
  // data
  const [user, setUser] = useState<any>(null);
  const [organizations, setOrganizations] = useState<Organization[] | null>([]);
  const [entities, setEntities] = useState<Entity[] | null>([]);
  const [deals, setDeals] = useState<Deal[] | null>([]);
  const [investments, setInvestments] = useState<Investment[] | null>([]);

  // app
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [betaAlert, showBetaAlert] = useState(true);
  const [slideOverData, setSlideOverData] = useState({});

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
        const users_infos = await fetchUser(session.user.email);
        const { data: _organizations } = await fetchOrganizations();
        setOrganizations(_organizations);
        const { data: _entities } = await fetchEntities();
        setEntities(_entities);
        const { data: _deals } = await fetchDeals();
        setDeals(deals);
        const { data: _investments } = await fetchInvestments();
        setInvestments(_investments);

        setUser({
          ...session.user,
          ...users_infos,
          is_super_admin: users_infos?.is_super_admin,
          currentOrganization: null
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const notify = (msg: string, success: boolean = false) => {
    if (success) {
      return toast.success(msg);
    }
    return toast.error(msg);
  };

  useEffect(() => {
    onAuthStateChange();
  }, []);

  const value = useMemo(() => {
    return {
      user,
      organizations,
      entities,
      deals,
      investments,
      open,
      notify,
      setCurrentOrganization: (orgId: string) =>
        setUser((prev: any) => ({ ...prev, currentOrganization: orgId })),
      setSlideOver,
      signOut
    };
  }, [user]);

  return (
    <AuthContext.Provider value={value}>
      {loading && <LoadingApp />}
      {!loading && !user && <Login />}
      {!loading && user && (
        <main>
          <NavBar />
          <div className="p-4">{children}</div>
          <SlideOver open={open} setOpen={setOpen} data={slideOverData} />
          <ToastContainer />
        </main>
      )}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const {
    user,
    organizations,
    entities,
    deals,
    investments,
    open,
    notify,
    setSlideOver,
    setCurrentOrganization,
    signOut
  }: any = useContext(AuthContext);
  return {
    user,
    organizations,
    entities,
    deals,
    investments,
    open,
    notify,
    setSlideOver,
    setCurrentOrganization,
    signOut
  };
};

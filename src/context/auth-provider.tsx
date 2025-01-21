import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/supabaseClient';
import type { User } from '@supabase/supabase-js';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContextType, AuthContext } from './auth-context';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  const logout = useCallback(async (): Promise<void> => {
    await supabase.auth.signOut();
    setUser(null);
    navigate(`/${lang}/login`);
  }, [lang, navigate]);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    getUser();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({ user, setUser, logout }),
    [user, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

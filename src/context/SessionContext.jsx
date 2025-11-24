import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase.js";

export const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data?.session || null);
      setUser(data?.session?.user || null);
      setLoadingSession(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session || null);
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription?.unsubscribe();
    };
  }, []);

  const register = async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password });
    return error;
  };

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error;
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  // Adiciona aliases para compatibilidade com componentes existentes
  const handleSignIn = async (email, password) => await login(email, password);
  const handleSignUp = async (email, password) => await register(email, password);

  return (
    <SessionContext.Provider
      value={{
        session,
        user,
        login,
        register,
        logout,
        loading: loadingSession,
        // aliases / compat
        handleSignIn,
        handleSignUp,
        message: null,
        error: null,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}

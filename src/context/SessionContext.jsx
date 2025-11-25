import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase.js";

export const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const register = async (email, password, username) => {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username || null,
            admin: false,
          },
        },
      });

      if (error) {
        setError(error.message || String(error));
        return { error };
      }

      setMessage('Registro realizado! Verifique seu e-mail para confirmar.');
      return { data };
    } catch (err) {
      setError(err.message || String(err));
      return { error: err };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message || String(error));
        return { error };
      }
      setSession(data.session || null);
      setMessage('Login realizado!');
      return { data };
    } catch (err) {
      setError(err.message || String(err));
      return { error: err };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const handleSignIn = async (email, password) => await login(email, password);
  const handleSignUp = async (email, password, username) => await register(email, password, username);

  return (
    <SessionContext.Provider
      value={{
        session,
        user,
        login,
        register,
        logout,
        loading: loading || loadingSession,
        // aliases / compat
        handleSignIn,
        handleSignUp,
        message,
        error,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}

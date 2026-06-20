import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase, isBackendAvailable } from "../services/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isBackendAvailable()) {
      // No Supabase configured — run in guest mode
      const savedGuest = localStorage.getItem('pm3-guest-user');
      if (savedGuest) {
        try { setCurrentUser(JSON.parse(savedGuest)); } catch {}
      }
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    if (!isBackendAvailable()) {
      // Guest mode sign-in simulation
      const guestUser = { id: 'guest', email, user_metadata: { full_name: email.split('@')[0] } };
      setCurrentUser(guestUser);
      localStorage.setItem('pm3-guest-user', JSON.stringify(guestUser));
      return { data: { user: guestUser }, error: null };
    }
    const result = await supabase.auth.signInWithPassword({ email, password });
    return result;
  };

  const signUp = async (email, password, fullName) => {
    if (!isBackendAvailable()) {
      const guestUser = { id: 'guest', email, user_metadata: { full_name: fullName } };
      setCurrentUser(guestUser);
      localStorage.setItem('pm3-guest-user', JSON.stringify(guestUser));
      return { data: { user: guestUser }, error: null };
    }
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });
    return result;
  };

  const signOut = async () => {
    if (!isBackendAvailable()) {
      setCurrentUser(null);
      localStorage.removeItem('pm3-guest-user');
      return;
    }
    await supabase.auth.signOut();
    setCurrentUser(null);
  };

  const signInWithOAuth = async (provider) => {
    if (!isBackendAvailable()) {
      // Can't do OAuth without Supabase
      return { data: null, error: { message: 'OAuth requires Supabase configuration' } };
    }
    const result = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin + '/Interview-Prep/dashboard',
      },
    });
    return result;
  };

  const resetPassword = async (email) => {
    if (!isBackendAvailable()) {
      return { data: null, error: { message: 'Password reset requires Supabase configuration' } };
    }
    const result = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/Interview-Prep/settings',
    });
    return result;
  };

  const value = {
    currentUser,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithOAuth,
    resetPassword,
    isBackendAvailable: isBackendAvailable(),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

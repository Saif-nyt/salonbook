"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { apiFetch, clearAccessToken } from "./api";
import { authClient } from "./auth-client";
import type { User } from "./types";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  completeSignIn: () => Promise<User | null>;
  refreshUser: () => Promise<User | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const loadUser = useCallback(async () => {
    try {
      const { data } = await apiFetch<User>("/api/users/me");
      setUser(data);
      return data;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    let active = true;

    // Session hydration on mount: the state update lands after the async request,
    // so this is not a synchronous setState cascade.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadUser().finally(() => {
      if (active) setIsLoading(false);
    });

    const handleUnauthorized = () => {
      clearAccessToken();
      setUser(null);
    };

    window.addEventListener("salonbook:unauthorized", handleUnauthorized);
    return () => {
      active = false;
      window.removeEventListener("salonbook:unauthorized", handleUnauthorized);
    };
  }, [loadUser]);

  const completeSignIn = useCallback(async () => {
    clearAccessToken();
    return loadUser();
  }, [loadUser]);

  const refreshUser = useCallback(async () => {
    return loadUser();
  }, [loadUser]);

  const signOut = useCallback(async () => {
    try {
      await authClient.signOut();
    } catch {
      // The local session is cleared even if the network request fails.
    }
    clearAccessToken();
    setUser(null);
    router.push("/");
    router.refresh();
  }, [router]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAdmin: user?.role === "admin",
      completeSignIn,
      refreshUser,
      signOut,
    }),
    [user, isLoading, completeSignIn, refreshUser, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../Api/user/types";
import { User as UserApi } from "../Api";

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("No access token found");
      setLoading(false);
      setUser(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await UserApi.GetCurrentUser();
      setUser(response.me);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching user:", err);
      setError(err.message || "Failed to fetch user data");
      // If token is invalid, clear it
      if (err.response?.status === 401) {
        localStorage.removeItem("accessToken");
      }
    } finally {
      setLoading(false);
    }
  };

  const clearUser = () => {
    setUser(null);
    setError(null);
  };

  // Don't auto-fetch on mount to avoid timing issues
  // Let components trigger fetchUser when needed

  const value: UserContextType = {
    user,
    loading,
    error,
    fetchUser,
    clearUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

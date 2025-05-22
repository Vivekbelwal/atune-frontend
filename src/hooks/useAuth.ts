import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  selectIsAuthenticated,
  selectUser,
  selectAuthLoading,
  selectAuthError,
} from '../store/slices/authSlice';
import type { User } from '../types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
}

/**
 * Custom hook for authentication functionality
 * Provides login, register, and logout methods along with auth state
 */
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  /**
   * Login with email and password
   */
  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        dispatch(loginStart());

        // In a real app, you would make an API call here
        // This is a simulated login for demo purposes
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            if (credentials.email && credentials.password) {
              dispatch(
                loginSuccess({
                  user: {
                    id: '1',
                    email: credentials.email,
                    name: 'Demo User',
                    role: 'user',
                  },
                  token: 'fake-jwt-token',
                }),
              );
            } else {
              dispatch(loginFailure('Please provide both email and password'));
            }
            resolve();
          }, 1000);
        });
      } catch (err) {
        dispatch(loginFailure('An error occurred during login'));
        throw err;
      }
    },
    [dispatch],
  );

  /**
   * Register a new user
   */
  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      try {
        dispatch(loginStart());

        // In a real app, you would make an API call here
        // This is a simulated registration for demo purposes
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            dispatch(
              loginSuccess({
                user: {
                  id: '1',
                  email: credentials.email,
                  name: credentials.name,
                  role: 'user',
                },
                token: 'fake-jwt-token',
              }),
            );
            resolve();
          }, 1000);
        });
      } catch (err) {
        dispatch(loginFailure('An error occurred during registration'));
        throw err;
      }
    },
    [dispatch],
  );

  /**
   * Logout the current user
   */
  const logoutUser = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    register,
    logout: logoutUser,
  };
};

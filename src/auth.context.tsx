import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import axios from 'axios';

export interface AuthContextProps {
  isLoggedIn: boolean;
  signIn: (jwt: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  signIn: () => {},
  signOut: () => {},
});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('jwt');
    return !!token;
  });

  const signIn = useCallback((jwt: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
    localStorage.setItem('jwt', jwt);
    setIsLoggedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('jwt');
    delete axios.defaults.headers.common.Authorization;
    setIsLoggedIn(false);
  }, []);

  const validateToken = useCallback(async () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      signOut();
      return;
    }

    try {
      const res = await axios.get('/auth/validate', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.data.valid) {
        console.warn('Token invalid:', res.data.reason);
        signOut();
      }
    } catch (err) {
      console.error('Eroare la validare token:', err);
      signOut();
    }
  }, [signOut]);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  useEffect(() => {
    const interval = setInterval(
      () => {
        validateToken();
      },
      5 * 60 * 1000
    ); // la fiecare 5 minute

    return () => clearInterval(interval);
  }, [validateToken]);

  const value = useMemo(() => ({ isLoggedIn, signIn, signOut }), [isLoggedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

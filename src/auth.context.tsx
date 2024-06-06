import {
  createContext,
  PropsWithChildren,
  useCallback,
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
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('jwt'));

  const signIn = useCallback((jwt: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
    localStorage.setItem('jwt', jwt);
    setIsLoggedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
  }, []);

  const value = useMemo(() => ({ isLoggedIn, signIn, signOut }), [isLoggedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  userId: number;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  loading: true, // Set initial loading state to true
  login: () => {},
  logout: () => {},
});

interface Props {
  children: ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // New loading state

  const login = (token: string) => {
    localStorage.setItem('token', token);
    const decoded: User = jwtDecode(token);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded: User = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error('Invalid token');
        setUser(null);
      }
    }
    setLoading(false); // Set loading to false after checking the token
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

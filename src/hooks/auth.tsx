import React, { 
  createContext, 
  ReactNode, 
  useContext 
} from "react";

import * as AuthSession from 'expo-auth-session';

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const user = {
    id: '21323131',
    name: 'Alê',
    email: 'aleuci.lima@gmail.com'
  }

  async function signInWithGoogle() {
    try {
      const CLIENT_ID = '';
      const REDIRECT_URI = '';
      const RESPONSE_TYPE = '';
      const SCOPE = '';

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      AuthSession.startAsync({ authUrl });

    } catch (error) {
      throw new Error(error as any);
    }
  }

  return (
    <AuthContext.Provider value={{ user }}>
      { children }
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
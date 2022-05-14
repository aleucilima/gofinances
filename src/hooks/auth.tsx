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
  signInWithGoogle(): Promise<void>;
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
      const CLIENT_ID = '1000501326723-3ioe78gtps5j7mgjlo8ke5597jr9jhhc.apps.googleusercontent.com';
      const REDIRECT_URI = 'https://auth.expo.io/@aleucilima/gofinances';
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const response = await AuthSession.startAsync({ authUrl });
      

    } catch (error) {
      throw new Error(error as any);
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      signInWithGoogle 
    }}>
      { children }
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
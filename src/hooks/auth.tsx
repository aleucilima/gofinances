import React, { 
  createContext, 
  ReactNode, 
  useContext,
  useState,
  useEffect
} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';

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
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
  userStorageLoading: boolean;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  },
  type: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const userStorageKey = '@gofinances:user';
  
  async function signInWithGoogle() {
    try {
      const authParams = new URLSearchParams({
        client_id: CLIENT_ID,
        redirect_uri: AuthSession.makeRedirectUri({ useProxy: true }),
        response_type: 'token',
        scope: encodeURI('profile email')
      } as any);
      
      const { type, params } = await AuthSession.startAsync({
        authUrl: `https://accounts.google.com/o/oauth2/v2/auth?${authParams.toString()}`,
      }) as AuthorizationResponse;
      
      if (type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
        );

        const userInfo = await response.json();

        const loadedUser: User = {
          id: String(userInfo.id),
          name: userInfo.given_name,
          email: userInfo.email,
          photo: userInfo.picture
        }

        setUser(loadedUser);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(loadedUser));
      }

    } catch (error) {
      throw new Error(error as undefined);
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      });

      if (credential) {
        const name = credential.fullName!.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`

        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo 
        };
          
        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }

    } catch (error) {
      throw new Error(error as undefined);
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(() => {
    async function loadUserStorageData(){
      const userStorage = await AsyncStorage.getItem(userStorageKey);

      if (userStorage) {
        const userLogged = JSON.parse(userStorage) as User;
        setUser(userLogged);
      }
      setUserStorageLoading(false);
    }

    loadUserStorageData();
  } , []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      signInWithGoogle,
      signInWithApple,
      signOut,
      userStorageLoading
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
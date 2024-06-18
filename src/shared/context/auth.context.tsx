import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { User } from "../../domain/entities/user.entity";
import { useNavigation, useRouter, useSegments } from "expo-router";

interface SignInResponse {
  data: User;
  error?: Error | undefined;
}

interface SignOutResponse {
  data: {} | undefined;
  error?: Error | undefined;
}

interface AuthContextValue {
  signIn: () => Promise<SignInResponse>;
  signUp: () => Promise<SignInResponse>;
  signOut: () => Promise<SignOutResponse>;
  user: User | null;
  authInitialized: boolean;
}

const userExample: User = { id: 'bbf94cdd-6acc-4e26-bfc1-978d86fa5ae4', name: 'José Carvalho' }
// const getStoredUser = async () => Promise.resolve(userExample);
const getStoredUser = async () => Promise.resolve(null);

const AuthContext = createContext<AuthContextValue | undefined> (undefined);

interface ProviderProps {
  children: ReactNode;
}

/**
 * Component which has the context of the user authentication
 *
 * @export
 * @param {ProviderProps} { children }
 * @return {*} 
 */
export function Provider({ children }: ProviderProps) {
  const [ user, setUser ] = useState<User | null>(null);
  const [ authInitialized, setAuthInitialized ] = useState(false);

  /**
   * Check if user is logged in and redirect him to the correct route is it applies
   * @param user 
   */
  const useProtectedRoute = (user: User | null) => {
    const segments = useSegments();
    const router = useRouter();

    // check if navigation was initialized
    const [ isNavigationInitialized, setIsNavigationInitialized ] = useState(false);
    const rootNavigation = useNavigation();

    useEffect(() => {
      const unsubscribe = rootNavigation?.addListener('state', (event) => {
        setIsNavigationInitialized(true);
      });
      return function cleanup() {
        if (unsubscribe) unsubscribe();
      };
    }, [rootNavigation]);

    useEffect(() => {
      const inAuthGroup = segments[0] === '(auth)';
      if (!authInitialized) return;
      
      if (!user && !inAuthGroup) router.replace('/sign-in')
      else if (user && inAuthGroup) router.replace('/home');
    }, [ user, segments, authInitialized, isNavigationInitialized ]);    
  }
  
  useEffect(() => {
    (async () => {
      try {
        // function to get the already logged in user
        const user = await getStoredUser();
        setUser(user);
      } catch (error) {
        setUser(null);
      }

      setAuthInitialized(true);
    })();
  }, []);

  const login = async (): Promise<SignInResponse> => {
    setUser(userExample);
    return Promise.resolve({ data: userExample });
  };
  const register = (): Promise<SignInResponse> => {
    setUser(userExample);
    return Promise.resolve({ data: userExample });
  };
  const logout = (): Promise<SignOutResponse> => {
    setUser(null);
    return Promise.resolve({ data: {} });
  };

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: login,
        signUp: register,
        signOut: logout,
        user,
        authInitialized
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook to use the AuthContext values
 * @returns {AuthContext}
 */
export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error('useAuth must be used inside the AuthContextProvider Component');
  return authContext;
}
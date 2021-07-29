import React, { 
  createContext,
  ReactNode,
  useContext
} from "react";

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

export const AuthContext = createContext({} as IAuthContextData);

const user = {
  id: '812821',
  name: 'Bruno',
  email: 'email@gmail.com'
}

function AuthProvider({ children }: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }
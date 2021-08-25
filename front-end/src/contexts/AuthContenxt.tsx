import { createContext, PropsWithChildren, useState } from "react";
import { loginService } from "../api/userService";
import { User } from "../types/user";

type AuthContextType = {
  user: User | null;
  singIn: (email: string, password: string) => void;
  handleSetUser: (user: User) => void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider(props: PropsWithChildren<any>) {
  const [user, setUser] = useState<User | null>(null);

  async function singIn(email: string, password: string) {
    const user = await loginService(email, password);
    if (user) {
      setUser(user);
    }
  }

  function handleSetUser(user: User) {
    setUser(user);
  }

  return (
    <AuthContext.Provider value={{ user, singIn, handleSetUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

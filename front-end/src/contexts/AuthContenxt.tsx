import { createContext, PropsWithChildren, useState } from "react";
import { api } from "../api/axios";
import { loginService } from "../api/userService";
import { User } from "../models/user";

type AuthContextType = {
  user: User | null;
  singIn: (email: string, password: string) => Promise<boolean>;
  handleSetUser: (user: User) => void;
  refresh(): Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider(props: PropsWithChildren<any>) {
  const [user, setUser] = useState<User | null>(null);

  const singIn = async (email: string, password: string) => {
    if (user && user.email === email) {
      return false;
    }
    let newUser = null;
    try {
      newUser = await loginService(email, password);
      console.log(newUser);
    } catch (e) {
      return false;
    }

    if ((newUser as User).id) {
      setUser(newUser as User);
      return true;
    } else {
      return false;
    }
  };

  async function refresh() {
    if (!user) return;
    const response = await api.get(`/user/${user.id}`);
    setUser(response.data);
  }

  function handleSetUser(user: User) {
    setUser(user);
  }

  return (
    <AuthContext.Provider value={{ user, singIn, handleSetUser, refresh }}>
      {props.children}
    </AuthContext.Provider>
  );
}

import { User } from "../types/user";
import { api } from "./axios";

export const loginService = async (
  email: string,
  password: string
): Promise<User> => {
  const response = await api.post("/user/login", { email, password });

  return response.data;
};

export const registerService = async (
  name: string,
  email: string,
  phone: string,
  location: string,
  password: string
): Promise<User> => {
  const response = await api.post("/user", {
    name,
    email,
    password,
    location,
    phone,
    description: "",
  });

  return response.data;
};

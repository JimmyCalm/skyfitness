import api from "./index";
import { User } from "./types";

interface AuthResponse {
  token: string;
  user: User;
}

export const loginUser = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/login", { email, password });
  return res.data;
};

export const registerUser = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/register", {
    email,
    password,
  });
  return res.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const res = await api.get<User>("/users/me");
  return res.data;
};

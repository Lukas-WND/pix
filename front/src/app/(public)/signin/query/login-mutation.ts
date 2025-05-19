import { api } from "@/api/api.config";
import { LoginDTO } from "../interfaces/signin.interface";

export async function login(payload: LoginDTO) {
  const response = await api.post("/auth/signin", payload);

  return response;
}

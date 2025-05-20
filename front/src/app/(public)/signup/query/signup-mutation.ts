import { api } from "@/api/api.config";
import { SignupDTO } from "../interfaces/signup.interface";

export async function signup(payload: SignupDTO) {
  const response = await api.post("auth/signup", payload);

  return response.data;
}

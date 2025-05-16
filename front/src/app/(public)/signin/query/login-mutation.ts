import { api } from "@/api/api.config";

type Payload = {
  username: string;
  password: string;
};

export async function login(payload: Payload) {
  const response = await api.post("/auth/signin", payload);

  return response;
}

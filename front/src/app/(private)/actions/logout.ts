import { api } from "@/api/api.config";

export async function logout() {
  const response = await api.delete("/auth/logout");

  return response;
}

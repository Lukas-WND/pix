import { api } from "@/api/api.config";

export async function getAllCharges() {
  const response = await api.get("/charges");

  return response.data;
}

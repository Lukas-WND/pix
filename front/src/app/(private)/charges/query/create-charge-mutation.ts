import { api } from "@/api/api.config";

export async function createCharge(params: any) {
  const { data } = await api.post("/charges", params);

  return data;
}

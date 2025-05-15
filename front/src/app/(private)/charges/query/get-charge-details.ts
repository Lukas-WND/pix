import { api } from "@/api/api.config";

export async function getChargeDetails(chargeId: string) {
  const response = await api.get(`/charges/${chargeId}`);

  return response.data;
}

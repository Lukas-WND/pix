import { api } from "@/api/api.config";

export async function simulatePayment(chargeId: any) {
  const response = await api.post("/charges/simulate-payment", chargeId);

  return response.data;
}

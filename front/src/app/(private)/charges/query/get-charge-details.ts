import { api } from "@/api/api.config";
import { ChargeDetails } from "../interfaces/charge-details.interface";

export async function getChargeDetails(
  chargeId: string
): Promise<ChargeDetails> {
  const response = await api.get(`/charges/${chargeId}`);

  return response.data;
}

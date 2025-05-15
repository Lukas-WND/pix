import { api } from "@/api/api.config";

export interface ViewCharge {
  id: string;
  amount: number;
  description: string;
  due_date?: Date;
  type: number;
  status: number;
}

export async function getAllCharges(): Promise<ViewCharge[]> {
  const response = await api.get("/charges");

  return response.data;
}

export interface Charge {
  id: string;
  type: number;
  status: number;
  description: string;
  due_date?: Date;
  amount: number;
}
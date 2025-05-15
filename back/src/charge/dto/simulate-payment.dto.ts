import { z } from 'zod';

export const SimulatePaymentSchema = z.object({
  id: z.string().min(1, { message: 'Informe o id da cobrança' }),
});

export type SimulatePaymentSchemaDTO = z.infer<typeof SimulatePaymentSchema>;

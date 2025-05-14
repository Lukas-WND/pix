import { z } from 'zod';

export const CreateChargeSchema = z.object({
  amount: z.coerce
    .number({ invalid_type_error: 'Somente números são válidos.' })
    .min(1, { message: 'O valor é obrigatório.' }),
  description: z.string().min(1, {
    message: 'A descrição é obrigatória.',
  }),
  instruction: z.string().min(1, { message: 'A instrução é obrigatória.' }),
  type: z.enum(['pixCashin', 'pixStaticCashin'], {
    required_error: 'O tipo é obrigatório.',
  }),
  due_date: z.string().datetime().optional(),
});

export type CreateChargeDTO = z.infer<typeof CreateChargeSchema>;

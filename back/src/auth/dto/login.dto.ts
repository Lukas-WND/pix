import { z } from 'zod';

export const LoginSchema = z.object({
  username: z.string().min(1, { message: 'O nome de usuário é obrigatório' }),
  password: z.string().min(1, { message: 'A senha é obrigatória' }),
});

export type LoginDTO = z.infer<typeof LoginSchema>;

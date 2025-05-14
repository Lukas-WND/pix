import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório' }),
  username: z.string().min(1, { message: 'O nome de usuário é obrigatório' }),
  email: z
    .string()
    .email({ message: 'Informe um e-mail válido' })
    .min(1, { message: 'O e-mail é obrigatório' }),
  password: z.string().min(1, { message: 'A senha é obrigatória' }),
  client_id: z
    .string()
    .min(1, { message: 'Informe o seu id de cliente Canvi' }),
  private_key: z
    .string()
    .min(1, { message: 'Informe o sua chave pessoal Canvi' }),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;

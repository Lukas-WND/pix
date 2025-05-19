import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, { message: "Informe o nome de usuário" }),
  password: z.string().min(1, { message: "Informe a senha" }),
});

export type LoginDTO = z.infer<typeof LoginSchema>;

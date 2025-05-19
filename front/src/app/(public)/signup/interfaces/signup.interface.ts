import { z } from "zod";

export const SignupSchema = z
  .object({
    name: z.string().min(1, { message: "O nome é obrigatório" }),
    username: z.string().min(1, { message: "O nome de usuário é obrigatório" }),
    email: z
      .string()
      .email({ message: "Informe um e-mail válido" })
      .min(1, { message: "O e-mail é obrigatório" }),
    client_id: z
      .string()
      .min(1, { message: "Informe o seu id de cliente Canvi" }),
    private_key: z
      .string()
      .min(1, { message: "Informe a sua chave pessoal Canvi" }),
    password: z.string().min(1, { message: "A senha é obrigatória" }),
    confirm_password: z.string().min(1, { message: "Confirme a senha" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas não coincidem",
    path: ["confirm_password"],
  });

export type SignupDTO = z.infer<typeof SignupSchema>;

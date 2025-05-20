"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../query/signup-mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SignupDTO, SignupSchema } from "../interfaces/signup.interface";

export function SignupForm({
  className,
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();

  const form = useForm<SignupDTO>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      client_id: "",
      private_key: "",
      password: "",
    },
  });

  const signup_mutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Cadastro realizado com sucesso!");
      router.push("/charges");
    },
    onError: (err: any) => {
      console.log(err);
      toast.error(err.response.data.message);
    },
  });

  function onSubmit(values: SignupDTO) {
    signup_mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Cadastro</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Entre com os dados abaixo para cadastrar-se
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Jhon Doe..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome de usuário</FormLabel>
                <FormControl>
                  <Input placeholder="user.name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="email@exemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="client_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID Canvi</FormLabel>
                <FormControl>
                  <Input placeholder="ID de cliente Canvi..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="private_key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chave privada Canvi</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Sua chave..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input placeholder="Senha..." type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme a Senha</FormLabel>
                <FormControl>
                  <Input placeholder="Confirme" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Enviar
          </Button>
        </div>
        <div className="text-center text-sm">
          Nâo possui uma conta?{" "}
          <Link href="/signin" className="underline underline-offset-4">
            Cadastre-se
          </Link>
        </div>
      </form>
    </Form>
  );
}

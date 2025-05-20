import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createCharge } from "../query/create-charge-mutation";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";

export function CreateChargeForm({
  handleClose,
}: {
  handleClose: () => void;
}) {
  const CreateChargeSchema = z.object({
    amount: z.coerce
      .number({ invalid_type_error: "Somente números são válidos." })
      .min(1, { message: "O valor é obrigatório." }),
    description: z.string().min(1, {
      message: "A descrição é obrigatória.",
    }),
    instruction: z.string().min(1, { message: "A instrução é obrigatória." }),
    type: z.enum(["pixCashin", "pixStaticCashin"], {
      required_error: "O tipo é obrigatório.",
    }),
    due_date: z
      .date()
      .min(new Date(), {
        message: "A data/hora de vencimento deve ser maior que a data atual",
      })
      .optional(),
  });

  type CreateSchemaDTO = z.infer<typeof CreateChargeSchema>;

  const form = useForm<CreateSchemaDTO>({
    resolver: zodResolver(CreateChargeSchema),
    defaultValues: {
      amount: 0,
      description: "",
      instruction: "",
      type: "pixCashin",
      due_date: undefined,
    },
  });

  const create_charge_mutation = useMutation({
    mutationFn: createCharge,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['charges']});
      toast.success("Cobrança criada com sucesso.");
      handleClose();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(values: CreateSchemaDTO) {
    create_charge_mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Valor (R$)</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="R$20,00..." {...field} />
              </FormControl>
              <FormDescription className="text-end">
                O valor a ser cobrado em Reais R$.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Descrição</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Descrição..." {...field} />
              </FormControl>
              <FormDescription className="text-end">
                Breve descrição da cobrança para rastreio
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instruction"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Instrução</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Instrução..." {...field} />
              </FormControl>
              <FormDescription className="text-end">
                Texto com o resumo da cobrança
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Tipo de Transação</FormLabel>
                <FormMessage />
              </div>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="pixStaticCashin">Estático</SelectItem>
                  <SelectItem value="pixCashin">Dinâmico</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="text-end">
                O tipo de transação a ser realizada.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="due_date"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Data de Vencimento</FormLabel>
                <FormMessage />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription className="text-end">
                A data limite para o pagamento de sua cobrança.
              </FormDescription>
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end items-center gap-2 mt-4">
          <Button
            type="button"
            variant={"outline"}
            className="flex-1"
            onClick={() => handleClose()}
          >
            Cancelar
          </Button>
          <Button type="submit" className="flex-1">
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
}

export type PreCharge = {
  valor: number;
  vencimento?: string;
  descricao: string;
  texto_instrucao: string;
  tipo_transacao: string;
  identificador_externo: string;
  identificador_movimento: string;
  enviar_qr_code: true;
};

export type GeneratePixResponse = {
  code: number;
  menssagem: string;
  data: {
    id_invoice_pix?: number;
    id_invoice_pix_documento?: number;
    valor: string;
    status: string;
    criacao: string;
    vencimento?: string;
  };
};

export type SimulatePixPayment = {
  id: number;
  tipo_transacao: 'pixCashin' | 'pixStaticCashin';
  pix: {
    pagamento: {
      valor: string;
      pagador: {
        id: string; // CPF ou CNPJ
        nome: string;
      };
    };
  };
};

export type QueryPixResponse = {
  status: string;
  brcode: string;
  qrcode: {
    type: string;
    data: number[];
  };
};

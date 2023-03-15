
export type TResponse<Data> = {
  statusCode : number,
  message: string;
  data: Data;
};
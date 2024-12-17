export interface IErrorSource {
  path: string | number;
  message: string;
}

export interface IErrorResponse {
  status: number;
  message: string;
  sources: IErrorSource[];
}

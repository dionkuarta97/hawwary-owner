export interface IPembagianOtomatisRequestParams {
  limit?: number;
  page?: number;
  search?: string;
}

export interface ICreatePembagianOtomatisRequest {
  name: string;
  percentage: number;
}

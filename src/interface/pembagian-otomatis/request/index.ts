export interface IPembagianOtomatisRequestParams {
  per_page?: number;
  page?: number;
  search?: string;
}

export interface ICreatePembagianOtomatisRequest {
  name: string;
  percentage: number;
}

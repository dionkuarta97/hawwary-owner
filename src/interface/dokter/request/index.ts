export interface IDokterRequestParams {
  limit?: number;
  page?: number;
  search?: string;
}

export interface ICreateDokterRequest {
  name: string;
}

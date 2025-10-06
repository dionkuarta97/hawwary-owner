export interface IDokterRequestParams {
  per_page?: number;
  page?: number;
  search?: string;
}

export interface ICreateDokterRequest {
  name: string;
}

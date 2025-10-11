export interface ISuccessPaginationResponse<T, S = null | any> {
  success: true;
  message: string;
  metadata: {
    data: T;
    current_page: number;
    total: number;
    per_page: number;
    last_page: number;
    statistics?: S;
  };
}

export interface ITransaksiRequestParams {
  limit?: number;
  page?: number;
  search?: string;
  order?: 'asc' | 'desc';
  docter_id?: number;
  status?: 'gagal' | 'sukses' | 'pending';
  start_date?: string;
  end_date?: string;
  dantel_id?: number;
}

export interface ITransaksiUpdateStatusRequest {
  status: 'gagal' | 'sukses' | 'pending';
}

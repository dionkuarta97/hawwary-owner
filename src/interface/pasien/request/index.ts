export interface IPasienRequestParams {
  limit?: number;
  page?: number;
  search?: string;
  orderby?: EPasienOrder;
  order?: 'asc' | 'desc';
}

export const EPasienOrder = {
  CREATED_AT: 'created_at',
  TOTAL_TRANSAKSI: 'total_transaksi',
} as const;

export type EPasienOrder = (typeof EPasienOrder)[keyof typeof EPasienOrder];

export interface IPasienEditRequest {
  nama?: string;
  domisili?: string;
  tanggal_lahir?: string;
  no_hp?: string;
  jenis_kelamin?: string;
  nik?: string;
}

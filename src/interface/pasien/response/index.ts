export interface IPasienResponse {
  id: number;
  no_rm: number;
  nama: string;
  domisili: string;
  tanggal_lahir: string;
  no_hp: string | null;
  jenis_kelamin: string;
  nik: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  total_transaksi: number;
}

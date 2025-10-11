export interface ITransaksiResponse {
  id: number;
  pasien_id: number;
  docter_id: number;
  dantel_id: number;
  total_amount: string;
  net_amount: string;
  description: string;
  status: 'sukses' | 'gagal' | 'pending';
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  pasien: {
    id: number;
    nama: string;
    no_rm: number;
    domisili: string;
    no_hp: string | null;
    nik: string | null;
    tanggal_lahir: string;
    jenis_kelamin: 'L' | 'P';
  };
  docter: {
    id: number;
    name: string;
  };
  dantel: {
    id: number;
    name: string;
  };
  operational: {
    id: number;
    transaksi_id: number;
    name: string;
    amount: string;
    description: string;
    status: 'success' | 'failed' | 'pending';
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
  } | null;
}

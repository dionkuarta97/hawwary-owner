export interface IOperationalResponse {
  id: number;
  transaksi_id: number;
  name: string;
  amount: string;
  description: string;
  status: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  transaksi: {
    id: number;
    pasien_id: number;
    docter_id: number;
    dantel_id: number;
    total_amount: string;
    net_amount: string;
    description: string;
    status: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    pasien: {
      id: number;
      nama: string;
      no_rm: number;
      domisili: string;
      no_hp: string;
    };
    docter: {
      id: number;
      name: string;
    };
    dantel: {
      id: number;
      name: string;
    };
  } | null;
}

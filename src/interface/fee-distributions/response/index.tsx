export interface IFeeDistributionResponse {
  id: number;
  transaksi_id: number;
  additional_fee_id: number;
  recipient_type: string;
  recipient_id: number | null;
  percentage: string;
  amount: string;
  created_at: string;
  updated_at: string;
  recipient: {
    id: number;
    name: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
  } | null;
  transaksi: {
    id: number;
    pasien_id: number;
    docter_id: number;
    dantel_id: number;
    total_amount: string;
    net_amount: string;
    description: string | null;
    status: 'sukses' | 'gagal' | 'pending';
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    pasien: {
      id: number;
      nama: string;
      no_rm: number;
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
  };
  additional_fee: {
    id: number;
    name: string;
    percentage: string;
  };
}

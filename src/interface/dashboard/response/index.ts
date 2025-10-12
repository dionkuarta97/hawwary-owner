export interface IDashboardResponse {
  type: 'today' | 'month' | 'year';
  current: IStatistics;
  previous: IStatistics;
}

interface IStatistics {
  period: {
    start: string;
    end: string;
  };
  statistics: {
    transaksi: {
      total: {
        count: number;
        amount: number;
        modal: number;
        net_amount: number;
      };
      success: {
        count: number;
        amount: number;
        modal: number;
        net_amount: number;
      };
      pending: {
        count: number;
        amount: number;
        modal: number;
        net_amount: number;
      };
      failed: {
        count: number;
        amount: number;
        modal: number;
        net_amount: number;
      };
    };
    pasien: {
      count: number;
    };
    fee_distribution: [
      {
        additional_fee_id: number;
        additional_fee_name: string;
        additional_fee_type: string | null;
        count: number;
        total_amount: number;
      },
      {
        additional_fee_id: number;
        additional_fee_name: 'Klinik';
        additional_fee_type: string | null;
        count: number;
        total_amount: number;
      },
      {
        additional_fee_id: number;
        additional_fee_name: string;
        additional_fee_type: string | null;
        count: number;
        total_amount: number;
      }
    ];
    operational_non_modal: {
      total: {
        count: number;
        amount: number;
      };
      success: {
        count: number;
        amount: number;
      };
      pending: {
        count: number;
        amount: number;
      };
      failed: {
        count: number;
        amount: number;
      };
    };
    pendapatan: {
      total_pendapatan: number;
      total_operational: number;
      pendapatan_bersih: number;
    };
  };
}

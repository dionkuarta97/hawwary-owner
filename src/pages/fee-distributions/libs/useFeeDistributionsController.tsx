import type { IColumn } from '@/components/default-table';
import { useQueryFeeDistributions } from '@/hooks/fee-distributions';
import type { IFeeDistributionRequestParams } from '@/interface/fee-distributions/request';
import type { IFeeDistributionResponse } from '@/interface/fee-distributions/response';
import { IconButton } from '@material-tailwind/react';
import { Eye } from 'iconoir-react';
import { formatDate } from 'date-fns';
import { useMemo, useState } from 'react';
import { useOpenCloseModal } from '@/hooks';

const useFeeDistributionsController = () => {
  const [params, setParams] = useState<IFeeDistributionRequestParams>({
    limit: 10,
    page: 1,
    search: '',
  });
  const { data, isLoading, error } = useQueryFeeDistributions(params);
  const { isOpen: modalDetail, setIsOpen: setModalDetail } = useOpenCloseModal();
  const [selectedItem, setSelectedItem] = useState<IFeeDistributionResponse | null>(null);
  const columns: IColumn<IFeeDistributionResponse>[] = useMemo(
    () => [
      {
        key: 'recipient',
        label: 'Recipient',
        render: ({ item }) => {
          return <span>{item.recipient?.name || item.recipient_type || '-'}</span>;
        },
      },
      {
        key: 'fee_distribution',
        label: 'Fee Distribution',
        width: 180,
        minWidth: 180,
        maxWidth: 180,
        render: ({ item }) => {
          return <span>Rp. {Number(item.amount).toLocaleString('id-ID') || '-'}</span>;
        },
      },
      {
        key: 'harga_net',
        label: 'Harga Net',
        width: 180,
        minWidth: 180,
        maxWidth: 180,
        render: ({ item }) => {
          return (
            <span>Rp. {Number(item.transaksi?.net_amount).toLocaleString('id-ID') || '-'}</span>
          );
        },
      },
      {
        key: 'percentage',
        label: 'Percentage',
        width: 100,
        minWidth: 100,
        maxWidth: 100,
        render: ({ item }) => {
          return <span>{item.percentage + '%' || '-'}</span>;
        },
      },
      {
        key: 'nama_pasien',
        label: 'Nama Pasien',
        render: ({ item }) => {
          return <span>{item.transaksi?.pasien?.nama || '-'}</span>;
        },
      },
      {
        key: 'created_at',
        label: 'Tanggal Transaksi',
        render: ({ item }) => {
          return <span>{formatDate(item.transaksi?.created_at, 'dd MMM yyyy, HH:mm')}</span>;
        },
      },
      {
        key: 'action',
        label: 'Aksi',
        width: 100,
        minWidth: 100,
        maxWidth: 100,
        action: ({ item }) => {
          return (
            <div className="flex gap-2">
              <IconButton
                onClick={() => {
                  setModalDetail(true);
                  setSelectedItem(item);
                }}
                className="cursor-pointer"
                size="sm"
                color="info"
              >
                <Eye />
              </IconButton>
            </div>
          );
        },
      },
    ],
    [data]
  );
  const clearFilter = () => {
    setParams({
      limit: 10,
      page: 1,
      search: '',
      recipient_type: undefined,
      recipient_id: undefined,
    });
  };
  const onApply = ({
    additionalFee,
    dokter,
    dantel,
    start_date,
    end_date,
  }: {
    additionalFee: string | null;
    dokter: string | null;
    dantel: string | null;
    start_date: Date | null;
    end_date: Date | null;
  }) => {
    setParams({
      ...params,
      recipient_type: additionalFee ? additionalFee : undefined,
      recipient_id: dokter ? Number(dokter) : dantel ? Number(dantel) : undefined,
      start_date: start_date ? formatDate(start_date, 'yyyy-MM-dd') : undefined,
      end_date: end_date ? formatDate(end_date, 'yyyy-MM-dd') : undefined,
      page: 1,
    });
  };
  return {
    data,
    isLoading,
    error,
    params,
    setParams,
    columns,
    clearFilter,
    onApply,
    modalDetail,
    setModalDetail,
    selectedItem,
    setSelectedItem,
  };
};

export default useFeeDistributionsController;

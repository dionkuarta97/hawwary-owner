import type { IColumn } from '@/components/default-table';
import { useQueryTransaksi } from '@/hooks/transaksi';
import type { ITransaksiRequestParams } from '@/interface/transaksi/request';
import type { ITransaksiResponse } from '@/interface/transaksi/response';
import { useMemo, useState } from 'react';
import { formatDate } from 'date-fns';
import { Badge } from 'flowbite-react';
import { IconButton } from '@material-tailwind/react';
import { Eye } from 'iconoir-react';
import { useOpenCloseModal } from '@/hooks';

const useTransaksiController = () => {
  const [params, setParams] = useState<ITransaksiRequestParams>({
    limit: 10,
    page: 1,
    search: '',
    dantel_id: undefined,
    docter_id: undefined,
    status: undefined,
    start_date: undefined,
    end_date: undefined,
  });
  const { data, isLoading, error } = useQueryTransaksi(params);
  const { isOpen: modalDetail, setIsOpen: setModalDetail } = useOpenCloseModal();
  const [selectedItem, setSelectedItem] = useState<ITransaksiResponse | null>(null);
  const columns: IColumn<ITransaksiResponse>[] = useMemo(() => {
    return [
      {
        key: 'nama',
        label: 'Nama',
        render: ({ item }) => {
          return <span>{item.pasien.nama}</span>;
        },
      },
      {
        key: 'dokter',
        label: 'Dokter',
        render: ({ item }) => {
          return <span>{item.docter.name}</span>;
        },
      },
      {
        key: 'status',
        label: 'Status',
        width: 100,
        minWidth: 100,
        maxWidth: 100,
        render: ({ item }) => {
          return (
            <Badge
              className="w-fit ml-auto lg:ml-0"
              color={
                item.status === 'sukses'
                  ? 'success'
                  : item.status === 'gagal'
                  ? 'failure'
                  : 'warning'
              }
            >
              {item.status.toUpperCase()}
            </Badge>
          );
        },
      },
      {
        key: 'dantel',
        label: 'Dantel',
        render: ({ item }) => {
          return <span>{item.dantel.name}</span>;
        },
      },
      {
        key: 'total_amount',
        label: 'Total Amount',
        render: ({ item }) => {
          return <span>{Number(item.total_amount).toLocaleString('id-ID')}</span>;
        },
      },
      {
        key: 'net_amount',
        label: 'Net Amount',
        render: ({ item }) => {
          return <span>{Number(item.net_amount).toLocaleString('id-ID')}</span>;
        },
      },
      {
        key: 'created_at',
        label: 'Created At',
        render: ({ item }) => {
          return <span>{formatDate(item.created_at, 'dd MMM yyyy, HH:mm')}</span>;
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
    ];
  }, []);

  const clearFilter = () => {
    setParams({
      limit: 10,
      page: 1,
      search: '',
      dantel_id: undefined,
      docter_id: undefined,
      status: undefined,
      start_date: undefined,
      end_date: undefined,
    });
  };
  const onApply = ({
    dokter,
    dantel,
    tanggalAwal,
    tanggalAkhir,
    statusFilter,
  }: {
    dokter: string | null;
    dantel: string | null;
    tanggalAwal: Date | null;
    tanggalAkhir: Date | null;
    statusFilter: string | null;
  }) => {
    setParams({
      ...params,
      docter_id: dokter ? Number(dokter) : undefined,
      dantel_id: dantel ? Number(dantel) : undefined,
      start_date: tanggalAwal ? formatDate(tanggalAwal, 'yyyy-MM-dd') : undefined,
      end_date: tanggalAkhir ? formatDate(tanggalAkhir, 'yyyy-MM-dd') : undefined,
      status: statusFilter as 'gagal' | 'sukses' | 'pending' | undefined,
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

export default useTransaksiController;

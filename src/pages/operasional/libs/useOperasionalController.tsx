import { useQueryOperational } from '@/hooks/operational';
import { useMemo, useState } from 'react';
import type { IOperationalRequestParams } from '@/interface/operational/request';
import type { IColumn } from '@/components/default-table';
import type { IOperationalResponse } from '@/interface/operational/response';
import { formatDate } from 'date-fns';
import { Badge } from 'flowbite-react';
import { useOpenCloseModal } from '@/hooks';
import { IconButton } from '@material-tailwind/react';
import { Eye } from 'iconoir-react';

const useOperasionalController = () => {
  const [params, setParams] = useState<IOperationalRequestParams>({
    limit: 10,
    page: 1,
    search: '',
    status: undefined,
    type: undefined,
    start_date: undefined,
    end_date: undefined,
  });
  const { data, isLoading, error } = useQueryOperational(params);
  const { isOpen: isOpenDetail, setIsOpen: setIsOpenDetail } = useOpenCloseModal();
  const [selectedItem, setSelectedItem] = useState<IOperationalResponse | null>(null);
  const columns: IColumn<IOperationalResponse>[] = useMemo(
    () => [
      {
        key: 'name',
        label: 'Nama',
      },
      {
        key: 'amount',
        label: 'Amount',
        render: ({ item }) => {
          return <span>Rp. {Number(item.amount).toLocaleString('id-ID')}</span>;
        },
      },
      {
        key: 'tipe',
        label: 'Tipe',
        render: ({ item }) => {
          return <span>{item.transaksi_id ? 'Modal' : 'Operasional'}</span>;
        },
        width: 150,
        minWidth: 150,
        maxWidth: 150,
      },
      {
        key: 'status',
        label: 'Status',
        render: ({ item }) => {
          return (
            <Badge
              className="w-fit ml-auto lg:ml-0"
              color={
                item.status === 'success'
                  ? 'success'
                  : item.status === 'failed'
                  ? 'failure'
                  : 'warning'
              }
            >
              {item.status.toUpperCase()}
            </Badge>
          );
        },
        width: 150,
        minWidth: 150,
        maxWidth: 150,
      },
      {
        key: 'created_at',
        label: 'Tanggal',
        render: ({ item }) => {
          return (
            <span>
              {formatDate(
                item.transaksi_id
                  ? item.transaksi?.created_at || new Date()
                  : item.created_at || new Date(),
                'dd MMM yyyy, HH:mm'
              )}
            </span>
          );
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
                  setIsOpenDetail(true);
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
  const onApply = ({
    statusFilter,
    type,
    tanggalAwal,
    tanggalAkhir,
  }: {
    statusFilter: string | null;
    type: string | null;
    tanggalAwal: Date | null;
    tanggalAkhir: Date | null;
  }) => {
    setParams({
      ...params,
      status: statusFilter || undefined,
      type: type || undefined,
      start_date: tanggalAwal ? formatDate(tanggalAwal, 'yyyy-MM-dd') : undefined,
      end_date: tanggalAkhir ? formatDate(tanggalAkhir, 'yyyy-MM-dd') : undefined,
      page: 1,
    });
  };
  const clearFilter = () => {
    setParams({
      limit: 10,
      page: 1,
      search: '',
      status: undefined,
      type: undefined,
      start_date: undefined,
      end_date: undefined,
    });
  };
  return {
    data,
    isLoading,
    error,
    params,
    setParams,
    columns,
    onApply,
    clearFilter,
    isOpenDetail,
    setIsOpenDetail,
    selectedItem,
    setSelectedItem,
  };
};

export default useOperasionalController;

import { useState } from 'react';
import type { IPasienRequestParams } from '@/interface/pasien/request';

import { useQueryPasien } from '@/hooks/pasien';
import { IconButton } from '@material-tailwind/react';
import { Eye, EditPencil } from 'iconoir-react';
import type { IColumn } from '@/components/default-table';
import type { IPasienResponse } from '@/interface/pasien/response';
import { useMemo } from 'react';
import { formatDate } from 'date-fns';
import { useOpenCloseModal } from '@/hooks';
const usePasienController = () => {
  const [params, setParams] = useState<IPasienRequestParams>({
    limit: 10,
    page: 1,
    search: '',
    orderby: undefined,
    order: undefined,
  });
  const { data, isLoading, error } = useQueryPasien(params);
  const { isOpen: isOpenDetail, setIsOpen: setIsOpenDetail } = useOpenCloseModal();
  const { isOpen: isOpenEdit, setIsOpen: setIsOpenEdit } = useOpenCloseModal();
  const [selectedItem, setSelectedItem] = useState<IPasienResponse | null>(null);
  const columns: IColumn<IPasienResponse>[] = useMemo(() => {
    return [
      {
        key: 'nama',
        label: 'Nama',
        maxWidth: 200,
        minWidth: 200,
        width: 200,
      },
      {
        key: 'no_rm',
        label: 'No RM',
        width: 100,
        minWidth: 100,
        maxWidth: 100,
      },

      {
        key: 'total_transaksi',
        label: 'Order',
        width: 80,
        minWidth: 80,
        maxWidth: 80,
        render: ({ value }) => {
          return <span>{value || 0}</span>;
        },
      },
      {
        key: 'domisili',
        label: 'Domisili',
      },
      {
        key: 'tanggal_lahir',
        label: 'Tanggal Lahir',
        render: ({ value }) => {
          return <span>{formatDate(value, 'dd MMM yyyy')}</span>;
        },
      },
      {
        key: 'created_at',
        label: 'Tanggal Daftar',
        render: ({ value }) => {
          return <span>{formatDate(value, 'dd MMM yyyy, HH:mm')}</span>;
        },
      },
      {
        key: 'action',
        label: 'Aksi',
        width: 105,
        minWidth: 105,
        maxWidth: 105,
        action: ({ item }) => {
          return (
            <div className="flex gap-2">
              <IconButton
                className="cursor-pointer"
                size="sm"
                color="info"
                onClick={() => {
                  setIsOpenDetail(true);
                  setSelectedItem(item);
                }}
              >
                <Eye />
              </IconButton>
              <IconButton
                className="cursor-pointer"
                size="sm"
                color="warning"
                onClick={() => {
                  setIsOpenEdit(true);
                  setSelectedItem(item);
                }}
              >
                <EditPencil />
              </IconButton>
            </div>
          );
        },
      },
    ];
  }, []);

  const clearOrders = () => {
    setParams({ ...params, orderby: undefined, order: undefined, page: 1 });
  };
  return {
    data,
    isLoading,
    error,
    params,
    setParams,
    columns,
    clearOrders,
    isOpenDetail,
    setIsOpenDetail,
    selectedItem,
    setSelectedItem,
    isOpenEdit,
    setIsOpenEdit,
  };
};
export default usePasienController;

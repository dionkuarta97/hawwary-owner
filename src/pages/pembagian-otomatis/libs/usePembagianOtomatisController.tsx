import { useDeletePembagianOtomatis, useQueryPembagianOtomatis } from '@/hooks/pembagian-otomatis';
import { useMemo, useState } from 'react';
import type { IColumn } from '@/components/default-table';
import type { IPembagianOtomatisResponse } from '@/interface/pembagian-otomatis/response';
import { IconButton } from '@material-tailwind/react';
import { EditPencil, Trash } from 'iconoir-react';
import type { IPembagianOtomatisRequestParams } from '@/interface/pembagian-otomatis/request';
import { useOpenCloseModal } from '@/hooks';

const usePembagianOtomatisController = () => {
  const [params, setParams] = useState<IPembagianOtomatisRequestParams>({
    limit: 10,
    page: 1,
    search: '',
  });
  const { data, isLoading, error } = useQueryPembagianOtomatis(params);

  const { isOpen: modalAdd, setIsOpen: setModalAdd } = useOpenCloseModal();
  const { isOpen: modalDelete, setIsOpen: setModalDelete } = useOpenCloseModal();
  const { deletePembagianOtomatis } = useDeletePembagianOtomatis();
  const [idDelete, setIdDelete] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<IPembagianOtomatisResponse | null>(null);
  const handleDeletePembagianOtomatis = async (id: number) => {
    await deletePembagianOtomatis(id);
    setModalDelete(false);
    setIdDelete(null);
  };
  const columns: IColumn<IPembagianOtomatisResponse>[] = useMemo(
    () => [
      {
        key: 'name',
        label: 'Nama',
      },
      {
        key: 'percentage',
        label: 'Persentase',
        render: ({ value }) => {
          return <span>{value}%</span>;
        },
      },
      {
        key: 'action',
        label: 'Aksi',
        width: 150,
        minWidth: 150,
        maxWidth: 150,
        action: ({ item }) => {
          return (
            <div className="flex gap-2">
              <IconButton
                onClick={() => {
                  setModalAdd(true);
                  setSelectedItem(item);
                }}
                className="cursor-pointer"
                size="sm"
                color="warning"
              >
                <EditPencil />
              </IconButton>
              <IconButton
                onClick={() => {
                  setModalDelete(true);
                  setIdDelete(item.id);
                }}
                className="cursor-pointer"
                size="sm"
                color="error"
              >
                <Trash />
              </IconButton>
            </div>
          );
        },
      },
    ],
    []
  );

  return {
    data,
    isLoading,
    error,
    columns,
    params,
    setParams,
    modalAdd,
    setModalAdd,
    modalDelete,
    setModalDelete,
    handleDeletePembagianOtomatis,
    idDelete,
    setIdDelete,
    selectedItem,
    setSelectedItem,
  };
};

export default usePembagianOtomatisController;

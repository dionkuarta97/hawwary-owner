import type { IDokterRequestParams } from '@/interface/dokter/request';
import { useMemo, useState } from 'react';
import { useDeleteDokter, useQueryDokter } from '@/hooks/dokter';
import { IconButton } from '@material-tailwind/react';
import { EditPencil, Trash } from 'iconoir-react';
import type { IDokterResponse } from '@/interface/dokter/response';
import type { IColumn } from '@/components/default-table';
import { useOpenCloseModal } from '@/hooks';

const useDokterController = () => {
  const [params, setParams] = useState<IDokterRequestParams>({
    limit: 10,
    page: 1,
    search: '',
  });
  const { data, isLoading, error } = useQueryDokter(params);
  const { isOpen: modalAdd, setIsOpen: setModalAdd } = useOpenCloseModal();
  const { isOpen: modalEdit, setIsOpen: setModalEdit } = useOpenCloseModal();
  const { isOpen: modalDelete, setIsOpen: setModalDelete } = useOpenCloseModal();
  const [idEdit, setIdEdit] = useState<number | null>(null);
  const [idDelete, setIdDelete] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<IDokterResponse | null>(null);
  const { deleteDokter } = useDeleteDokter();
  const handleDeleteDokter = async (id: number) => {
    await deleteDokter(id);
    setModalDelete(false);
    setIdDelete(null);
    setSelectedItem(null);
  };
  const columns: IColumn<IDokterResponse>[] = useMemo(
    () => [
      {
        key: 'name',
        label: 'Nama',
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
                  setModalEdit(true);
                  setIdEdit(item.id);
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
    params,
    setParams,
    columns,
    modalAdd,
    setModalAdd,
    modalEdit,
    setModalEdit,
    modalDelete,
    setModalDelete,
    idEdit,
    setIdEdit,
    idDelete,
    setIdDelete,
    selectedItem,
    setSelectedItem,
    handleDeleteDokter,
  };
};

export default useDokterController;

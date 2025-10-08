import type { IDantelRequestParams } from '@/interface/dantel/request';
import { useMemo, useState } from 'react';
import { useDeleteDantel, useQueryDantel } from '@/hooks/dantel';
import { IconButton } from '@material-tailwind/react';
import { EditPencil, Trash } from 'iconoir-react';
import type { IDantelResponse } from '@/interface/dantel/response';
import type { IColumn } from '@/components/default-table';
import { useOpenCloseModal } from '@/hooks';

const useDantelController = () => {
  const [params, setParams] = useState<IDantelRequestParams>({
    per_page: 10,
    page: 1,
    search: '',
  });
  const { data, isLoading, error } = useQueryDantel(params);
  const { isOpen: modalAdd, setIsOpen: setModalAdd } = useOpenCloseModal();
  const { isOpen: modalEdit, setIsOpen: setModalEdit } = useOpenCloseModal();
  const { isOpen: modalDelete, setIsOpen: setModalDelete } = useOpenCloseModal();
  const [idEdit, setIdEdit] = useState<number | null>(null);
  const [idDelete, setIdDelete] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<IDantelResponse | null>(null);
  const { deleteDantel } = useDeleteDantel();
  const handleDeleteDantel = async (id: number) => {
    await deleteDantel(id);
    setModalDelete(false);
    setIdDelete(null);
    setSelectedItem(null);
  };
  const columns: IColumn<IDantelResponse>[] = useMemo(
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
    handleDeleteDantel,
  };
};

export default useDantelController;

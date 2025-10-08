import type { IStaffRequestParams } from '@/interface/staff/request';
import { useMemo, useState } from 'react';
import { useDeleteStaff, useQueryStaff } from '@/hooks/staff';
import type { IColumn } from '@/components/default-table';
import type { IStaffResponse } from '@/interface/staff/response';
import { IconButton } from '@material-tailwind/react';
import { EditPencil, Trash } from 'iconoir-react';
import { useOpenCloseModal } from '@/hooks';

const useStaffController = () => {
  const [params, setParams] = useState<IStaffRequestParams>({
    per_page: 10,
    page: 1,
    search: '',
  });
  const { data, isLoading, error } = useQueryStaff(params);
  const [selectedItem, setSelectedItem] = useState<IStaffResponse | null>(null);
  const { isOpen: modalAdd, setIsOpen: setModalAdd } = useOpenCloseModal();
  const { isOpen: modalEdit, setIsOpen: setModalEdit } = useOpenCloseModal();
  const { isOpen: modalDeleteConfirmation, setIsOpen: setModalDeleteConfirmation } =
    useOpenCloseModal();
  const { deleteStaff } = useDeleteStaff();
  const columns: IColumn<IStaffResponse>[] = useMemo(() => {
    return [
      {
        key: 'name',
        label: 'Nama',
      },
      {
        key: 'username',
        label: 'Username',
      },
      {
        key: 'role',
        label: 'Role',
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
                  setSelectedItem(item);
                }}
                className="cursor-pointer"
                color="warning"
              >
                <EditPencil />
              </IconButton>
              <IconButton
                onClick={() => {
                  setModalDeleteConfirmation(true);
                  setSelectedItem(item);
                }}
                className="cursor-pointer"
                color="error"
              >
                <Trash />
              </IconButton>
            </div>
          );
        },
      },
    ];
  }, []);
  const handleDeleteStaff = async (id: number) => {
    await deleteStaff(id);
    setModalDeleteConfirmation(false);
    setSelectedItem(null);
  };
  return {
    data,
    isLoading,
    error,
    columns,
    params,
    setParams,
    modalAdd,
    setModalAdd,
    modalEdit,
    setModalEdit,
    selectedItem,
    setSelectedItem,
    modalDeleteConfirmation,
    setModalDeleteConfirmation,
    handleDeleteStaff,
  };
};

export default useStaffController;

import type {
  IChangePasswordStaffRequest,
  ICreateStaffRequest,
  IStaffRequestParams,
  IUpdateStaffRequest,
} from '@/interface/staff/request';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createStaff,
  getStaff,
  updateStaff,
  changePasswordStaff,
  deleteStaff,
} from '@/service/staff';
import queryKey from '@/hooks/queryKey';
import { toast } from '@/components/default-toast';
import { queryClient } from '@/App';
import { messageError } from '@/utils/helpers';

export const useQueryStaff = (params: IStaffRequestParams) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey.STAFF, params],
    queryFn: () => getStaff(params),
  });

  return { data, isLoading, error };
};

export const useCreateStaff = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (data: ICreateStaffRequest) => createStaff(data),
    onSuccess: async () => {
      toast.success('Berhasil!', 'Staff berhasil ditambahkan');
      await queryClient.invalidateQueries({
        queryKey: [queryKey.STAFF],
        refetchType: 'active',
      });
    },
    onError: error => {
      const message = messageError(error, 'Terjadi kesalahan saat menambahkan staff');
      toast.error('Gagal!', message);
    },
  });
  return { createStaff: mutateAsync };
};

export const useUpdateStaff = () => {
  const { mutateAsync } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: IUpdateStaffRequest }) => updateStaff(id, data),
    onSuccess: async () => {
      toast.success('Berhasil!', 'Staff berhasil diubah');
      await queryClient.invalidateQueries({
        queryKey: [queryKey.STAFF],
        refetchType: 'active',
      });
    },
    onError: error => {
      const message = messageError(error, 'Terjadi kesalahan saat mengubah staff');
      toast.error('Gagal!', message);
    },
  });
  return { updateStaff: mutateAsync };
};

export const useChangePasswordStaff = () => {
  const { mutateAsync } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: IChangePasswordStaffRequest }) =>
      changePasswordStaff(id, data),
    onSuccess: () => {
      toast.success('Berhasil!', 'Password staff berhasil diubah');
    },
    onError: error => {
      const message = messageError(error, 'Terjadi kesalahan saat mengubah password staff');
      toast.error('Gagal!', message);
    },
  });
  return { changePasswordStaff: mutateAsync };
};

export const useDeleteStaff = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (id: number) => deleteStaff(id),
    onSuccess: () => {
      toast.success('Berhasil!', 'Staff berhasil dihapus');
      queryClient.invalidateQueries({ queryKey: [queryKey.STAFF] });
    },
    onError: error => {
      const message = messageError(error, 'Terjadi kesalahan saat menghapus staff');
      toast.error('Gagal!', message);
    },
  });
  return { deleteStaff: mutateAsync };
};

import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteOperational, getOperational, updateOperationalStatus } from '@/service/operational';
import queryKey from '../queryKey';
import type { IOperationalRequestParams } from '@/interface/operational/request';
import { toast } from '@/components/default-toast';
import { messageError } from '@/utils/helpers';
import { queryClient } from '@/App';

export const useQueryOperational = (params: IOperationalRequestParams) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey.OPERASIONAL, params],
    queryFn: () => getOperational(params),
  });

  return { data, isLoading, error };
};

export const useUpdateOperationalStatus = () => {
  const { mutateAsync } = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      updateOperationalStatus(id, status),
    onSuccess: () => {
      toast.success('Berhasil!', 'Operasional status berhasil diubah');
      queryClient.invalidateQueries({
        queryKey: [queryKey.OPERASIONAL],
        refetchType: 'active',
      });
    },
    onError: error => {
      const message = messageError(error, 'Terjadi kesalahan saat mengubah operasional status');
      toast.error('Gagal!', message);
    },
  });

  return { updateOperationalStatus: mutateAsync };
};

export const useDeleteOperational = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (id: number) => deleteOperational(id),
    onSuccess: () => {
      toast.success('Berhasil!', 'Operasional berhasil dihapus');
      queryClient.invalidateQueries({
        queryKey: [queryKey.OPERASIONAL],
        refetchType: 'active',
      });
    },
    onError: error => {
      const message = messageError(error, 'Terjadi kesalahan saat menghapus operasional');
      toast.error('Gagal!', message);
    },
  });
  return { deleteOperational: mutateAsync };
};

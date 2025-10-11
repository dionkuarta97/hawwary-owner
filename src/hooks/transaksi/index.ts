import type {
  ITransaksiRequestParams,
  ITransaksiUpdateStatusRequest,
} from '@/interface/transaksi/request';
import { getTransaksi, updateTransaksiStatus, deleteTransaksi } from '@/service/transaksi';
import queryKey from '../queryKey';
import { useMutation, useQuery } from '@tanstack/react-query';
import { messageError } from '@/utils/helpers';
import { toast } from '@/components/default-toast';
import { queryClient } from '@/App';

export const useQueryTransaksi = (params: ITransaksiRequestParams) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey.TRANSAKSI, params],
    queryFn: () => getTransaksi(params),
  });

  return { data, isLoading, error };
};

export const useUpdateTransaksiStatus = () => {
  const { mutateAsync } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ITransaksiUpdateStatusRequest }) =>
      updateTransaksiStatus(id, data),
    onSuccess: async () => {
      toast.success('Berhasil!', 'Transaksi status berhasil diubah');
      await queryClient.invalidateQueries({
        queryKey: [queryKey.TRANSAKSI],
        refetchType: 'active',
      });
    },
    onError: error => {
      const message = messageError(error, 'Terjadi kesalahan saat mengubah transaksi status');
      toast.error('Gagal!', message);
    },
  });

  return { updateTransaksiStatus: mutateAsync };
};

export const useDeleteTransaksi = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (id: number) => deleteTransaksi(id),
    onSuccess: () => {
      toast.success('Berhasil!', 'Transaksi berhasil dihapus');
      queryClient.invalidateQueries({
        queryKey: [queryKey.TRANSAKSI],
        refetchType: 'active',
      });
    },
    onError: error => {
      const message = messageError(error, 'Terjadi kesalahan saat menghapus transaksi');
      toast.error('Gagal!', message);
    },
  });
  return { deleteTransaksi: mutateAsync };
};

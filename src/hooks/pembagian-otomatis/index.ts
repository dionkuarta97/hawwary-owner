import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createPembagianOtomatis,
  deletePembagianOtomatis,
  getPembagianOtomatis,
  updatePembagianOtomatis,
} from '@/service/pembagian-otomatis';
import queryKey from '../queryKey';
import type {
  ICreatePembagianOtomatisRequest,
  IPembagianOtomatisRequestParams,
} from '@/interface/pembagian-otomatis/request';
import { toast } from '@/components/default-toast';
import { queryClient } from '@/App';

export const useQueryPembagianOtomatis = (params: IPembagianOtomatisRequestParams) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey.PEMBAGIAN_OTOMATIS, params],
    queryFn: () => getPembagianOtomatis(params),
  });

  return { data, isLoading, error };
};

export const useCreatePembagianOtomatis = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (data: ICreatePembagianOtomatisRequest) => createPembagianOtomatis(data),
    onSuccess: () => {
      toast.success('Berhasil!', 'Pembagian otomatis berhasil ditambahkan');
      queryClient.invalidateQueries({ queryKey: [queryKey.PEMBAGIAN_OTOMATIS] });
    },
    onError: error => {
      const message = Array.isArray(error.message)
        ? error.message.join(', ')
        : error.message || 'Terjadi kesalahan saat menambahkan pembagian otomatis';
      toast.error('Gagal!', message);
    },
  });

  return { createPembagianOtomatis: mutateAsync };
};

export const useDeletePembagianOtomatis = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (id: number) => deletePembagianOtomatis(id),
    onSuccess: () => {
      toast.success('Berhasil!', 'Pembagian otomatis berhasil dihapus');
      queryClient.invalidateQueries({ queryKey: [queryKey.PEMBAGIAN_OTOMATIS] });
    },
    onError: error => {
      const message = Array.isArray(error.message)
        ? error.message.join(', ')
        : error.message || 'Terjadi kesalahan saat menghapus pembagian otomatis';
      toast.error('Gagal!', message);
    },
  });

  return { deletePembagianOtomatis: mutateAsync };
};

export const useUpdatePembagianOtomatis = () => {
  const { mutateAsync } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ICreatePembagianOtomatisRequest }) =>
      updatePembagianOtomatis(id, data),
    onSuccess: () => {
      toast.success('Berhasil!', 'Pembagian otomatis berhasil diubah');
      queryClient.invalidateQueries({ queryKey: [queryKey.PEMBAGIAN_OTOMATIS] });
    },
    onError: error => {
      const message = Array.isArray(error.message)
        ? error.message.join(', ')
        : error.message || 'Terjadi kesalahan saat mengubah pembagian otomatis';
      toast.error('Gagal!', message);
    },
  });

  return { updatePembagianOtomatis: mutateAsync };
};

import { useMutation, useQuery } from '@tanstack/react-query';
import { createDokter, deleteDokter, getDokter, updateDokter } from '@/service/dokter';
import queryKey from '../queryKey';
import type { ICreateDokterRequest, IDokterRequestParams } from '@/interface/dokter/request';
import { toast } from '@/components/default-toast';
import { queryClient } from '@/App';

export const useQueryDokter = (params: IDokterRequestParams) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey.DOKTER, params],
    queryFn: () => getDokter(params),
  });

  return { data, isLoading, error };
};
export const useCreateDokter = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (data: ICreateDokterRequest) => createDokter(data),
    onSuccess: () => {
      toast.success('Berhasil!', 'Dokter berhasil ditambahkan');
      queryClient.invalidateQueries({ queryKey: [queryKey.DOKTER] });
    },
    onError: error => {
      const message = Array.isArray(error.message)
        ? error.message.join(', ')
        : error.message || 'Terjadi kesalahan saat menambahkan dokter';
      toast.error('Gagal!', message);
    },
  });

  return { createDokter: mutateAsync };
};

export const useDeleteDokter = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (id: number) => deleteDokter(id),
    onSuccess: () => {
      toast.success('Berhasil!', 'Dokter berhasil dihapus');
      queryClient.invalidateQueries({ queryKey: [queryKey.DOKTER] });
    },
    onError: error => {
      const message = Array.isArray(error.message)
        ? error.message.join(', ')
        : error.message || 'Terjadi kesalahan saat menghapus dokter';
      toast.error('Gagal!', message);
    },
  });

  return { deleteDokter: mutateAsync };
};

export const useUpdateDokter = () => {
  const { mutateAsync } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ICreateDokterRequest }) =>
      updateDokter(id, data),
    onSuccess: () => {
      toast.success('Berhasil!', 'Dokter berhasil diubah');
      queryClient.invalidateQueries({ queryKey: [queryKey.DOKTER] });
    },
    onError: error => {
      const message = Array.isArray(error.message)
        ? error.message.join(', ')
        : error.message || 'Terjadi kesalahan saat mengubah dokter';
      toast.error('Gagal!', message);
    },
  });

  return { updateDokter: mutateAsync };
};

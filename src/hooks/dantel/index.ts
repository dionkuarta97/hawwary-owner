import { useMutation, useQuery } from '@tanstack/react-query';
import { createDantel, deleteDantel, getDantel, updateDantel } from '@/service/dantel';
import queryKey from '../queryKey';
import type { ICreateDantelRequest, IDantelRequestParams } from '@/interface/dantel/request';
import { toast } from '@/components/default-toast';
import { queryClient } from '@/App';
import { messageError } from '@/utils/helpers';

export const useQueryDantel = (params: IDantelRequestParams) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey.DANTEL, params],
    queryFn: () => getDantel(params),
  });

  return { data, isLoading, error };
};
export const useCreateDantel = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (data: ICreateDantelRequest) => createDantel(data),
    onSuccess: () => {
      toast.success('Berhasil!', 'Dantel berhasil ditambahkan');
      queryClient.invalidateQueries({ queryKey: [queryKey.DANTEL] });
    },
    onError: error => {
      const message = messageError(error, 'Terjadi kesalahan saat menambahkan dantel');
      toast.error('Gagal!', message);
    },
  });

  return { createDantel: mutateAsync };
};

export const useDeleteDantel = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (id: number) => deleteDantel(id),
    onSuccess: () => {
      toast.success('Berhasil!', 'Dantel berhasil dihapus');
      queryClient.invalidateQueries({ queryKey: [queryKey.DANTEL] });
    },
    onError: error => {
      const message = messageError(error, 'Terjadi kesalahan saat menghapus dantel');
      toast.error('Gagal!', message);
    },
  });

  return { deleteDantel: mutateAsync };
};

export const useUpdateDantel = () => {
  const { mutateAsync } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ICreateDantelRequest }) =>
      updateDantel(id, data),
    onSuccess: () => {
      toast.success('Berhasil!', 'Dantel berhasil diubah');
      queryClient.invalidateQueries({ queryKey: [queryKey.DANTEL] });
    },
    onError: error => {
      const message = messageError(error, 'Terjadi kesalahan saat mengubah dantel');
      toast.error('Gagal!', message);
    },
  });

  return { updateDantel: mutateAsync };
};

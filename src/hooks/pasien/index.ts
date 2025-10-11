import { useMutation, useQuery } from '@tanstack/react-query';
import { getPasien, editPasien } from '@/service/pasien';
import queryKey from '../queryKey';
import type { IPasienEditRequest, IPasienRequestParams } from '@/interface/pasien/request';
import { messageError } from '@/utils/helpers';
import { toast } from '@/components/default-toast';
import { queryClient } from '@/App';

export const useQueryPasien = (params: IPasienRequestParams) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey.PASIEN, params],
    queryFn: () => getPasien(params),
  });

  return { data, isLoading, error };
};

export const useUpdatePasien = () => {
  const { mutateAsync } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: IPasienEditRequest }) => editPasien(id, data),
    onSuccess: async () => {
      toast.success('Berhasil!', 'Pasien berhasil diubah');
      await queryClient.invalidateQueries({
        queryKey: [queryKey.PASIEN],
        refetchType: 'active',
      });
    },
    onError: error => {
      const message = messageError(error, 'Terjadi kesalahan saat mengubah pasien');
      toast.error('Gagal!', message);
    },
  });

  return { updatePasien: mutateAsync };
};

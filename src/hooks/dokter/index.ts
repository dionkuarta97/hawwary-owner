import { useQuery } from '@tanstack/react-query';
import { getDokter } from '@/service/dokter';
import queryKey from '../queryKey';
import type { IDokterRequestParams } from '@/interface/dokter/request';

export const useQueryDokter = (params: IDokterRequestParams) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey.DOKTER, params],
    queryFn: () => getDokter(params),
  });

  return { data, isLoading, error };
};

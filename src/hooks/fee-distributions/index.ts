import { useQuery } from '@tanstack/react-query';
import { getFeeDistributions } from '@/service/fee-distributions';
import queryKey from '../queryKey';
import type { IFeeDistributionRequestParams } from '@/interface/fee-distributions/request';

export const useQueryFeeDistributions = (params: IFeeDistributionRequestParams) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey.FEE_DISTRIBUTION, params],
    queryFn: () => getFeeDistributions(params),
  });

  return { data, isLoading, error };
};

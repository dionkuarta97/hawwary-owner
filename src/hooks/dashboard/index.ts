import { useQuery } from '@tanstack/react-query';
import { getDashboard } from '@/service/dashboard';
import queryKey from '../queryKey';
import type { IDashboardRequestParams } from '@/interface/dashboard/request';

export const useQueryDashboard = (params: IDashboardRequestParams) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey.DASHBOARD, params],
    queryFn: () => getDashboard(params),
    enabled: !!params,
  });

  return { data, isLoading, error };
};

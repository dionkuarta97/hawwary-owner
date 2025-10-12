import axiosInstance from '@/axios';
import type { IDashboardRequestParams } from '@/interface/dashboard/request';
import type { ISuccessResponse } from '@/interface/response/success';
import type { IDashboardResponse } from '@/interface/dashboard/response';

export const getDashboard = async (
  params: IDashboardRequestParams
): Promise<ISuccessResponse<IDashboardResponse>> => {
  const response = await axiosInstance.get('/owner/statistic/dashboard', { params });
  return response.data;
};

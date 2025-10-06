import axiosInstance from '@/axios';
import type { IDokterRequestParams } from '@/interface/dokter/request';
import type { IDokterResponse } from '@/interface/dokter/response';
import type { ISuccessPaginationResponse } from '@/interface/response/successWithPaginate';

export const getDokter = async (
  params: IDokterRequestParams
): Promise<ISuccessPaginationResponse<IDokterResponse, {}>> => {
  const response = await axiosInstance.get('/owner/docter/get', {
    params,
  });
  return response.data;
};

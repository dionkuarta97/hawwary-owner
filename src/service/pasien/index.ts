import axiosInstance from '@/axios';
import type { IPasienEditRequest, IPasienRequestParams } from '@/interface/pasien/request';
import type { IPasienResponse } from '@/interface/pasien/response';
import type { ISuccessResponse } from '@/interface/response/success';
import type { ISuccessPaginationResponse } from '@/interface/response/successWithPaginate';

export const getPasien = async (
  params: IPasienRequestParams
): Promise<
  ISuccessPaginationResponse<
    IPasienResponse,
    { total: number; pasien_loyal: number; pasien_baru_bulan_ini: number }
  >
> => {
  const response = await axiosInstance.get('/owner/pasien/get', {
    params,
  });
  return response.data;
};

export const editPasien = async (
  id: number,
  data: IPasienEditRequest
): Promise<ISuccessResponse<IPasienResponse>> => {
  const response = await axiosInstance.put(`/owner/pasien/update/${id}`, data);
  return response.data;
};

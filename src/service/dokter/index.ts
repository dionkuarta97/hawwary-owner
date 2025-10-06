import axiosInstance from '@/axios';
import type { ICreateDokterRequest, IDokterRequestParams } from '@/interface/dokter/request';
import type { IDokterResponse } from '@/interface/dokter/response';
import type { ISuccessResponse } from '@/interface/response/success';
import type { ISuccessPaginationResponse } from '@/interface/response/successWithPaginate';

export const getDokter = async (
  params: IDokterRequestParams
): Promise<ISuccessPaginationResponse<IDokterResponse, {}>> => {
  const response = await axiosInstance.get('/owner/docter/get', {
    params,
  });
  return response.data;
};

export const createDokter = async (
  data: ICreateDokterRequest
): Promise<ISuccessResponse<IDokterResponse>> => {
  const response = await axiosInstance.post('/owner/docter/create', data);
  return response.data;
};

export const updateDokter = async (
  id: number,
  data: ICreateDokterRequest
): Promise<ISuccessResponse<IDokterResponse>> => {
  const response = await axiosInstance.put(`/owner/docter/update/${id}`, data);
  return response.data;
};

export const deleteDokter = async (id: number): Promise<ISuccessResponse<IDokterResponse>> => {
  const response = await axiosInstance.delete(`/owner/docter/delete/${id}`);
  return response.data;
};

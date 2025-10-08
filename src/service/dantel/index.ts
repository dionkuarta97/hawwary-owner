import axiosInstance from '@/axios';
import type { ICreateDantelRequest, IDantelRequestParams } from '@/interface/dantel/request';
import type { IDantelResponse } from '@/interface/dantel/response';
import type { ISuccessResponse } from '@/interface/response/success';
import type { ISuccessPaginationResponse } from '@/interface/response/successWithPaginate';

export const getDantel = async (
  params: IDantelRequestParams
): Promise<ISuccessPaginationResponse<IDantelResponse, {}>> => {
  const response = await axiosInstance.get('/owner/dantel/get', {
    params,
  });
  return response.data;
};

export const createDantel = async (
  data: ICreateDantelRequest
): Promise<ISuccessResponse<IDantelResponse>> => {
  const response = await axiosInstance.post('/owner/dantel/create', data);
  return response.data;
};

export const updateDantel = async (
  id: number,
  data: ICreateDantelRequest
): Promise<ISuccessResponse<IDantelResponse>> => {
  const response = await axiosInstance.put(`/owner/dantel/update/${id}`, data);
  return response.data;
};

export const deleteDantel = async (id: number): Promise<ISuccessResponse<IDantelResponse>> => {
  const response = await axiosInstance.delete(`/owner/dantel/delete/${id}`);
  return response.data;
};

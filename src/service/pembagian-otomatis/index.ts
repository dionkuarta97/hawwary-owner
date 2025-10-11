import type { ISuccessPaginationResponse } from '@/interface/response/successWithPaginate';
import type { IPembagianOtomatisResponse } from '@/interface/pembagian-otomatis/response';
import axiosInstance from '@/axios';
import type {
  ICreatePembagianOtomatisRequest,
  IPembagianOtomatisRequestParams,
} from '@/interface/pembagian-otomatis/request';
import type { ISuccessResponse } from '@/interface/response/success';

export const getPembagianOtomatis = async (
  params: IPembagianOtomatisRequestParams
): Promise<
  ISuccessPaginationResponse<
    IPembagianOtomatisResponse[],
    {
      total_percentage: number;
    }
  >
> => {
  const response = await axiosInstance.get('/owner/addtional-fees/get', {
    params,
  });
  return response.data;
};

export const createPembagianOtomatis = async (
  data: ICreatePembagianOtomatisRequest
): Promise<ISuccessResponse<IPembagianOtomatisResponse>> => {
  const response = await axiosInstance.post('/owner/addtional-fees/create', data);
  return response.data;
};

export const deletePembagianOtomatis = async (
  id: number
): Promise<ISuccessResponse<IPembagianOtomatisResponse>> => {
  const response = await axiosInstance.delete(`/owner/addtional-fees/delete/${id}`);
  return response.data;
};

export const updatePembagianOtomatis = async (
  id: number,
  data: ICreatePembagianOtomatisRequest
): Promise<ISuccessResponse<IPembagianOtomatisResponse>> => {
  const response = await axiosInstance.put(`/owner/addtional-fees/update/${id}`, data);
  return response.data;
};

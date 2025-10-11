import type {
  ITransaksiRequestParams,
  ITransaksiUpdateStatusRequest,
} from '@/interface/transaksi/request';
import type { ITransaksiResponse } from '@/interface/transaksi/response';
import type { ISuccessPaginationResponse } from '@/interface/response/successWithPaginate';
import axiosInstance from '@/axios';
import type { ISuccessResponse } from '@/interface/response/success';

export const getTransaksi = async (
  params: ITransaksiRequestParams
): Promise<
  ISuccessPaginationResponse<
    ITransaksiResponse,
    {
      total: string;
      pending: number;
      success: string;
      failed: string;
      total_modal: number;
    }
  >
> => {
  const response = await axiosInstance.get('/owner/transaksi/get', {
    params,
  });
  return response.data;
};

export const updateTransaksiStatus = async (
  id: number,
  data: ITransaksiUpdateStatusRequest
): Promise<ISuccessResponse<ITransaksiResponse>> => {
  const response = await axiosInstance.put(`/owner/transaksi/update-status/${id}`, data);
  return response.data;
};

export const deleteTransaksi = async (
  id: number
): Promise<ISuccessResponse<ITransaksiResponse>> => {
  const response = await axiosInstance.delete(`/owner/transaksi/delete/${id}`);
  return response.data;
};

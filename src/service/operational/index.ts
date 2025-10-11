import axiosInstance from '@/axios';
import type { IOperationalRequestParams } from '@/interface/operational/request';
import type { ISuccessPaginationResponse } from '@/interface/response/successWithPaginate';
import type { IOperationalResponse } from '@/interface/operational/response';

export const getOperational = async (
  params: IOperationalRequestParams
): Promise<
  ISuccessPaginationResponse<
    IOperationalResponse[],
    {
      total: string;
      total_modal: string;
      total_non_modal: string;
      pending: number;
      success: string;
      failed: string;
    }
  >
> => {
  const response = await axiosInstance.get('/owner/operation/get', {
    params,
  });
  return response.data;
};

export const deleteOperational = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/owner/operation/delete/${id}`);
};

export const updateOperationalStatus = async (id: number, status: string): Promise<void> => {
  await axiosInstance.put(`/owner/operation/update-status/${id}`, { status });
};

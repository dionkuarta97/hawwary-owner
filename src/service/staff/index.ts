import axiosInstance from '@/axios';
import type {
  IChangePasswordStaffRequest,
  ICreateStaffRequest,
  IUpdateStaffRequest,
  IStaffRequestParams,
} from '@/interface/staff/request';
import type { IStaffResponse } from '@/interface/staff/response';
import type { ISuccessPaginationResponse } from '@/interface/response/successWithPaginate';

export const getStaff = async (
  params: IStaffRequestParams
): Promise<ISuccessPaginationResponse<IStaffResponse, {}>> => {
  const response = await axiosInstance.get('/owner/staff/get', {
    params,
  });
  return response.data;
};

export const createStaff = async (data: ICreateStaffRequest) => {
  const response = await axiosInstance.post('/owner/staff/create', data);
  return response.data;
};

export const updateStaff = async (id: number, data: IUpdateStaffRequest) => {
  const response = await axiosInstance.put(`/owner/staff/update/${id}`, data);
  return response.data;
};

export const changePasswordStaff = async (id: number, data: IChangePasswordStaffRequest) => {
  const response = await axiosInstance.post(`/owner/staff/change-password/${id}`, data);
  return response.data;
};

export const deleteStaff = async (id: number) => {
  const response = await axiosInstance.delete(`/owner/staff/delete/${id}`);
  return response.data;
};

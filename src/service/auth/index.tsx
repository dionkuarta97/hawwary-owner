import axiosInstance from '@/axios';
import type { ISuccessResponse } from '@/interface/response/success';
import type { ILoginRequest } from '@/interface/auth/request';
import type { ILoginResponse } from '@/interface/auth/response';

export const postLogin = async (data: ILoginRequest): Promise<ISuccessResponse<ILoginResponse>> => {
  const response = await axiosInstance.post('/login', data);
  return response.data;
};

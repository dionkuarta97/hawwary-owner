export interface IStaffRequestParams {
  per_page?: number;
  page?: number;
  search?: string;
}

export interface ICreateStaffRequest {
  name: string;
  username: string;
  password: string;
}

export interface IUpdateStaffRequest {
  name: string;
  username: string;
}

export interface IChangePasswordStaffRequest {
  new_password: string;
  new_password_confirmation: string;
}

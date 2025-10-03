
import { atomWithStorage } from 'jotai/utils';
import type { ILoginResponse } from '@/interface/auth/response';

const tokenState = atomWithStorage<string | null>('token', localStorage.getItem('token') || null);

const userState = atomWithStorage<ILoginResponse['user'] | null>(
  'user',
  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null
);

const authStore = {
  token: tokenState,
  user: userState,
};

export default authStore;

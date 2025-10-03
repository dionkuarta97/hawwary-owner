
import { toast } from '@/components/default-toast';
import type { IErrorResponse } from '@/interface/response/error';
import authStore from '@/store/auth';
import axios, { AxiosError } from 'axios';
import { getDefaultStore } from 'jotai';


const baseUrl = {
  prod: 'https://api.hawwarydentalcare.com/api',
  dev: 'http://127.0.0.1:8000/api',
};
// http://127.0.0.1:8000/api
const axiosInstance = axios.create({
  baseURL: baseUrl.dev,
});

// Get Jotai store instance
const store = getDefaultStore();

// Request interceptor to add bearer token
axiosInstance.interceptors.request.use(
  config => {
    const token = store.get(authStore.token);
    config.headers.Accept = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    let newError: IErrorResponse = {
      success: false,
      message: 'Terjadi kesalahan yang tidak diketahui',
      data: null,
    };

    if (error instanceof AxiosError) {
      if (error.response) {
        // Server merespons dengan status code di luar range 2xx
        newError = {
          success: false,
          message: error.response.data?.message || 'Terjadi kesalahan pada server',
          data: error.response.data?.data || null,
        };

        // Auto logout jika error 401 (Unauthorized)
        if (error.response.status === 401) {
          // Clear token dan user dari store
          store.set(authStore.token, null);
          store.set(authStore.user, null);
          
          // Clear localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          
      
          const message = Array.isArray(error.response.data.message) ? error.response.data.message.join(', ') : error.response.data.message || 'Session expired';
         toast.error('Gagal!', message);
       
        }
      } else if (error.request) {
        // Request dibuat tapi tidak ada response
        newError = {
          success: false,
          message: 'Tidak ada response dari server',
          data: null,
        };
      } else {
        // Ada error saat setup request
        newError = {
          success: false,
          message: error.message || 'Terjadi kesalahan saat mengirim request',
          data: null,
        };
      }
    }
    return Promise.reject(newError);
  }
);

export default axiosInstance;
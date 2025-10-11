import axiosInstance from '@/axios';
import type { IFeeDistributionRequestParams } from '@/interface/fee-distributions/request';
import type { ISuccessPaginationResponse } from '@/interface/response/successWithPaginate';
import type { IFeeDistributionResponse } from '@/interface/fee-distributions/response';

const getFeeDistributions = async (
  params: IFeeDistributionRequestParams
): Promise<
  ISuccessPaginationResponse<
    IFeeDistributionResponse[],
    {
      total_amount: string;
      by_additional_fee: {
        dokter: {
          name: string;
          total_amount: number;
          total_count: number;
        };
        klinik: {
          name: string;
          total_amount: number;
          total_count: number;
        };
        dantel: {
          name: string;
          total_amount: number;
          total_count: number;
        };
      };
    }
  >
> => {
  const response = await axiosInstance.get('/owner/fee-distribution/get', {
    params,
  });
  return response.data;
};

export { getFeeDistributions };

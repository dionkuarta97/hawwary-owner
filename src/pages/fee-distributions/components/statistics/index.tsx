import StatisticWithValue from '@/components/statistic-with-value';
import { Collapse } from '@material-tailwind/react';
import { NavArrowDown, NavArrowUp } from 'iconoir-react';
import { useState } from 'react';

export interface IStatisticsProps {
  data?: {
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
  };
}

const Statistics = ({ data }: IStatisticsProps) => {
  const [isStatisticOpen, setIsStatisticOpen] = useState(false);
  return (
    <>
      {/* Statistik - Desktop (Always Visible) */}
      <div className="hidden lg:flex flex-col gap-4">
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-4">
          <StatisticWithValue
            className="w-full lg:w-auto"
            title={'Total Fee Distribution'}
            value={`Rp ${Number(data?.total_amount || 0).toLocaleString('id-ID')}`}
          />
          <StatisticWithValue
            className="w-full lg:w-auto"
            title="Dokter"
            value={`Rp ${Number(data?.by_additional_fee?.dokter?.total_amount || 0).toLocaleString(
              'id-ID'
            )}`}
          />
          <StatisticWithValue
            className="w-full lg:w-auto"
            title="Klinik"
            value={`Rp ${Number(data?.by_additional_fee?.klinik?.total_amount || 0).toLocaleString(
              'id-ID'
            )}`}
          />

          <StatisticWithValue
            className="w-full  lg:w-auto"
            title="Dantel"
            value={`Rp ${Number(data?.by_additional_fee?.dantel?.total_amount || 0).toLocaleString(
              'id-ID'
            )}`}
          />
        </div>
      </div>
      {/* Statistik - Mobile (With Collapse) */}
      <div className="lg:hidden">
        <div
          onClick={() => setIsStatisticOpen(!isStatisticOpen)}
          className="bg-white rounded-lg p-4 shadow-sm cursor-pointer flex justify-between items-center"
        >
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">Statistik Fee Distribution</span>
            <span className="text-xs text-gray-500">
              {isStatisticOpen ? 'Klik untuk menutup' : 'Klik untuk melihat'}
            </span>
          </div>
          {isStatisticOpen ? (
            <NavArrowUp className="h-5 w-5 text-gray-600" />
          ) : (
            <NavArrowDown className="h-5 w-5 text-gray-600" />
          )}
        </div>

        <Collapse open={isStatisticOpen}>
          <div
            style={{ gridTemplateRows: 'repeat(2, 1fr)' }}
            className="grid grid-cols-2 gap-3 mt-3"
          >
            <StatisticWithValue
              className="w-full"
              title="Total Fee Distribution"
              value={`Rp ${Number(data?.total_amount || 0).toLocaleString('id-ID')}`}
            />
            <StatisticWithValue
              className="w-full"
              title="Dokter"
              value={`Rp ${Number(
                data?.by_additional_fee?.dokter?.total_amount || 0
              ).toLocaleString('id-ID')}`}
            />
            <StatisticWithValue
              className="w-full "
              title="Klinik"
              value={`Rp ${Number(
                data?.by_additional_fee?.klinik?.total_amount || 0
              ).toLocaleString('id-ID')}`}
            />
            <StatisticWithValue
              className="w-full "
              title="Dantel"
              value={`Rp ${Number(
                data?.by_additional_fee?.dantel?.total_amount || 0
              ).toLocaleString('id-ID')}`}
            />
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default Statistics;

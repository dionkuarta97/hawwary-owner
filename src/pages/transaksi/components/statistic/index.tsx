import StatisticWithValue from '@/components/statistic-with-value';
import { Collapse } from '@material-tailwind/react';
import { NavArrowDown, NavArrowUp } from 'iconoir-react';
import { useState } from 'react';

interface IStatisticProps {
  total: string;
  pending: number;
  success: string;
  failed: string;
  total_modal: number;
}

const Statistic = (props: IStatisticProps) => {
  const { total, pending, success, failed, total_modal } = props;
  const [isStatisticOpen, setIsStatisticOpen] = useState(false);
  return (
    <>
      {/* Statistik - Desktop (Always Visible) */}
      <div className="hidden lg:flex flex-col gap-4">
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-4">
          <StatisticWithValue
            className="w-full lg:w-auto"
            title="Total Transaksi"
            value={`Rp ${Number(total).toLocaleString('id-ID')}`}
          />
          <StatisticWithValue
            className="w-full lg:w-auto"
            title="Pending"
            value={`Rp ${Number(pending).toLocaleString('id-ID')}`}
          />
          <StatisticWithValue
            className="w-full lg:w-auto"
            title="Success"
            value={`Rp ${Number(success).toLocaleString('id-ID')}`}
          />
        </div>
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-4">
          <StatisticWithValue
            className="w-full  lg:w-auto"
            title="Failed"
            value={`Rp ${Number(failed).toLocaleString('id-ID')}`}
          />
          <StatisticWithValue
            className="w-full  lg:w-auto"
            title="Total Modal"
            value={`Rp ${Number(total_modal).toLocaleString('id-ID')}`}
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
            <span className="text-sm font-semibold text-gray-900">Statistik Transaksi</span>
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
              title="Total Transaksi"
              value={`Rp ${Number(total).toLocaleString('id-ID')}`}
            />
            <StatisticWithValue
              className="w-full"
              title="Pending"
              value={`Rp ${Number(pending).toLocaleString('id-ID')}`}
            />
            <StatisticWithValue
              className="w-full "
              title="Success"
              value={`Rp ${Number(success).toLocaleString('id-ID')}`}
            />
            <StatisticWithValue
              className="w-full "
              title="Failed"
              value={`Rp ${Number(failed).toLocaleString('id-ID')}`}
            />
            <StatisticWithValue
              className="w-full col-span-2"
              title="Total Modal"
              value={`Rp ${Number(total_modal).toLocaleString('id-ID')}`}
            />
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default Statistic;

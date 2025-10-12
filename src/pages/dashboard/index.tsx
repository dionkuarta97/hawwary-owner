import Container from '@/components/container';
import TitleWithDesc from '@/components/title-with-desc';
import DefaultSelect from '@/components/default-select';
import type { IDashboardRequestParams } from '@/interface/dashboard/request';
import { useState } from 'react';
import { useQueryDashboard } from '@/hooks/dashboard';

const Dashboard = () => {
  const [params, setParams] = useState<IDashboardRequestParams>({
    type: 'today',
  });
  const { data } = useQueryDashboard(params);
  const options = [
    {
      label: 'Hari Ini',
      value: 'today',
    },
    {
      label: 'Bulan Ini',
      value: 'month',
    },
    {
      label: 'Tahun Ini',
      value: 'year',
    },
  ];
  const Card = ({
    title,
    valueCurrent,
    valuePrevious,
  }: {
    title: string;
    valueCurrent: string;
    valuePrevious: string;
  }) => {
    return (
      <div className="flex flex-col border border-gray-200 rounded-md p-4 gap-2">
        <p className="text-md text-gray-500">{title}</p>
        <p className="text-lg text-gray-800">{valueCurrent}</p>
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <p className="text-sm text-gray-400">Sebelumnya</p>
          <p className="text-sm text-gray-400">{valuePrevious}</p>
        </div>
      </div>
    );
  };
  return (
    <Container className="py-4 gap-4 lg:py-8">
      <TitleWithDesc title="Dashboard" desc="Fitur ini digunakan untuk melihat dashboard" />
      <div className="bg-white">
        <DefaultSelect
          options={options}
          value={params.type}
          onSelect={value => setParams({ ...params, type: value as 'today' | 'month' | 'year' })}
          placeholder="Pilih Periode"
        />
      </div>
      <div className="flex flex-col p-4 rounded-md gap-4 bg-white">
        <p className="text-lg text-gray-800">Pendapatan</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card
            title="Total"
            valueCurrent={`${Number(
              data?.data?.current?.statistics?.pendapatan?.total_pendapatan
            ).toLocaleString('id-ID')}`}
            valuePrevious={`${Number(
              data?.data?.previous?.statistics?.pendapatan?.total_pendapatan
            ).toLocaleString('id-ID')}`}
          />
          <Card
            title="Operasional"
            valueCurrent={`${Number(
              data?.data?.current?.statistics?.pendapatan?.total_operational
            ).toLocaleString('id-ID')}`}
            valuePrevious={`${Number(
              data?.data?.previous?.statistics?.pendapatan?.total_operational
            ).toLocaleString('id-ID')}`}
          />
          <Card
            title="Pendapatan Bersih"
            valueCurrent={`${Number(
              data?.data?.current?.statistics?.pendapatan?.pendapatan_bersih
            ).toLocaleString('id-ID')}`}
            valuePrevious={`${Number(
              data?.data?.previous?.statistics?.pendapatan?.pendapatan_bersih
            ).toLocaleString('id-ID')}`}
          />
        </div>
        <p className="text-lg text-gray-800">Transaksi</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card
            title="Total"
            valueCurrent={`${Number(
              data?.data?.current?.statistics?.transaksi?.total?.amount
            ).toLocaleString('id-ID')}`}
            valuePrevious={`${Number(
              data?.data?.previous?.statistics?.transaksi?.total?.amount
            ).toLocaleString('id-ID')}`}
          />
          <Card
            title="Pending"
            valueCurrent={`${Number(
              data?.data?.current?.statistics?.transaksi?.pending?.amount
            ).toLocaleString('id-ID')}`}
            valuePrevious={`${Number(
              data?.data?.previous?.statistics?.transaksi?.pending?.amount
            ).toLocaleString('id-ID')}`}
          />
          <Card
            title="Success"
            valueCurrent={`${Number(
              data?.data?.current?.statistics?.transaksi?.success?.amount
            ).toLocaleString('id-ID')}`}
            valuePrevious={`${Number(
              data?.data?.previous?.statistics?.transaksi?.success?.amount
            ).toLocaleString('id-ID')}`}
          />
          <Card
            title="Failed"
            valueCurrent={`${Number(
              data?.data?.current?.statistics?.transaksi?.failed?.amount
            ).toLocaleString('id-ID')}`}
            valuePrevious={`${Number(
              data?.data?.previous?.statistics?.transaksi?.failed?.amount
            ).toLocaleString('id-ID')}`}
          />
        </div>
        <p className="text-lg text-gray-800">Pasien</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card
            title="Total"
            valueCurrent={`${Number(data?.data?.current?.statistics?.pasien?.count).toLocaleString(
              'id-ID'
            )}`}
            valuePrevious={`${Number(
              data?.data?.previous?.statistics?.pasien?.count
            ).toLocaleString('id-ID')}`}
          />
        </div>
        <p className="text-lg text-gray-800">Modal Layanan</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card
            title="Total"
            valueCurrent={`${Number(
              data?.data?.current?.statistics?.transaksi?.total?.modal
            ).toLocaleString('id-ID')}`}
            valuePrevious={`${Number(
              data?.data?.previous?.statistics?.transaksi?.total?.modal
            ).toLocaleString('id-ID')}`}
          />
          <Card
            title="Success"
            valueCurrent={`${Number(
              data?.data?.current?.statistics?.transaksi?.success?.modal
            ).toLocaleString('id-ID')}`}
            valuePrevious={`${Number(
              data?.data?.previous?.statistics?.transaksi?.success?.modal
            ).toLocaleString('id-ID')}`}
          />
          <Card
            title="Pending"
            valueCurrent={`${Number(
              data?.data?.current?.statistics?.transaksi?.pending?.modal
            ).toLocaleString('id-ID')}`}
            valuePrevious={`${Number(
              data?.data?.previous?.statistics?.transaksi?.pending?.modal
            ).toLocaleString('id-ID')}`}
          />
          <Card
            title="Failed"
            valueCurrent={`${Number(
              data?.data?.current?.statistics?.transaksi?.failed?.modal
            ).toLocaleString('id-ID')}`}
            valuePrevious={`${Number(
              data?.data?.previous?.statistics?.transaksi?.failed?.modal
            ).toLocaleString('id-ID')}`}
          />
        </div>
        <p className="text-lg text-gray-800">Operasional Non Modal</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card
            title="Total"
            valueCurrent={`${Number(
              data?.data?.current?.statistics?.operational_non_modal?.total?.amount
            ).toLocaleString('id-ID')}`}
            valuePrevious={`${Number(
              data?.data?.previous?.statistics?.operational_non_modal?.total?.amount
            ).toLocaleString('id-ID')}`}
          />
          <Card
            title="Success"
            valueCurrent={`${Number(
              data?.data?.current?.statistics?.operational_non_modal?.success?.amount
            ).toLocaleString('id-ID')}`}
            valuePrevious={`${Number(
              data?.data?.previous?.statistics?.operational_non_modal?.success?.amount
            ).toLocaleString('id-ID')}`}
          />
          <Card
            title="Pending"
            valueCurrent={`${Number(
              data?.data?.current?.statistics?.operational_non_modal?.pending?.amount
            ).toLocaleString('id-ID')}`}
            valuePrevious={`${Number(
              data?.data?.previous?.statistics?.operational_non_modal?.pending?.amount
            ).toLocaleString('id-ID')}`}
          />
          <Card
            title="Failed"
            valueCurrent={`${Number(
              data?.data?.current?.statistics?.operational_non_modal?.failed?.amount
            ).toLocaleString('id-ID')}`}
            valuePrevious={`${Number(
              data?.data?.previous?.statistics?.operational_non_modal?.failed?.amount
            ).toLocaleString('id-ID')}`}
          />
        </div>
        {data?.data?.current?.statistics?.fee_distribution &&
          data?.data?.current?.statistics?.fee_distribution?.length > 0 && (
            <div className="flex flex-col gap-4">
              <p className="text-lg text-gray-800">Fee Distribution</p>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {data?.data?.current?.statistics?.fee_distribution?.map((item, index) => (
                  <Card
                    key={index}
                    title={item.additional_fee_name}
                    valueCurrent={`${Number(item.total_amount).toLocaleString('id-ID')}`}
                    valuePrevious={`${Number(
                      data?.data?.previous?.statistics?.fee_distribution?.[index]?.total_amount || 0
                    ).toLocaleString('id-ID')}`}
                  />
                ))}
              </div>
            </div>
          )}
      </div>
    </Container>
  );
};

export default Dashboard;

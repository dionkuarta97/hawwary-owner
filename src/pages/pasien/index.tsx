import Container from '@/components/container';
import TitleWithDesc from '@/components/title-with-desc';
import usePasienController from './libs/usePasienController';
import DefaultTable from '@/components/default-table';
import type { IPasienResponse } from '@/interface/pasien/response';
import StatisticWithValue from '@/components/statistic-with-value';
import Filter from './components/filter';
import ModalDetail from './components/modal-detail';
import ModalEdit from './components/modal-edit';
import { Collapse } from '@material-tailwind/react';
import { NavArrowDown, NavArrowUp } from 'iconoir-react';
import { useState } from 'react';

const PasienPage = () => {
  const {
    data,
    isLoading,
    params,
    setParams,
    columns,
    isOpenDetail,
    setIsOpenDetail,
    selectedItem,
    setSelectedItem,
    isOpenEdit,
    setIsOpenEdit,
  } = usePasienController();

  const [isStatisticOpen, setIsStatisticOpen] = useState(false);

  return (
    <Container className="py-4 lg:py-8 gap-4">
      <ModalDetail
        isOpen={isOpenDetail}
        onClose={() => {
          setIsOpenDetail(false);
          setSelectedItem(null);
        }}
        data={selectedItem as IPasienResponse}
      />
      <ModalEdit
        isOpen={isOpenEdit}
        onClose={() => {
          setIsOpenEdit(false);
          setSelectedItem(null);
        }}
        pasien={selectedItem as IPasienResponse}
      />
      <TitleWithDesc title="Data Pasien" desc="Fitur ini digunakan untuk melihat data pasien" />

      {/* Statistik - Desktop (Always Visible) */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-4">
        <StatisticWithValue
          className="w-full lg:w-auto"
          title="Total Pasien"
          value={`${data?.metadata?.statistics?.total ?? 0}`}
        />
        <StatisticWithValue
          className="w-full lg:w-auto"
          title="Pasien Loyal"
          value={`${data?.metadata?.statistics?.pasien_loyal ?? 0}`}
        />
        <StatisticWithValue
          className="w-full lg:w-auto"
          title="Pasien Baru (Bulan Ini)"
          value={`${data?.metadata?.statistics?.pasien_baru_bulan_ini ?? 0}`}
        />
      </div>

      {/* Statistik - Mobile (With Collapse) */}
      <div className="lg:hidden">
        <div
          onClick={() => setIsStatisticOpen(!isStatisticOpen)}
          className="bg-white rounded-lg p-4 shadow-sm cursor-pointer flex justify-between items-center"
        >
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">Statistik Pasien</span>
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
              title="Total Pasien"
              value={`${data?.metadata?.statistics?.total ?? 0}`}
            />
            <StatisticWithValue
              className="w-full"
              title="Pasien Loyal"
              value={`${data?.metadata?.statistics?.pasien_loyal ?? 0}`}
            />
            <StatisticWithValue
              className="w-full col-span-2"
              title="Pasien Baru (Bulan Ini)"
              value={`${data?.metadata?.statistics?.pasien_baru_bulan_ini ?? 0}`}
            />
          </div>
        </Collapse>
      </div>
      <DefaultTable<IPasienResponse>
        defaultShowDataMobile={3}
        filter={
          <Filter
            order={params.orderby}
            orderType={params.order}
            onApply={({ order, orderType }) => {
              setParams({ ...params, orderby: order, order: orderType, page: 1 });
            }}
            onReset={() => {
              setParams({ ...params, orderby: undefined, order: undefined, page: 1 });
            }}
          />
        }
        data={Array.isArray(data?.metadata?.data) ? data.metadata.data : []}
        columns={columns}
        isLoading={isLoading}
        page={params.page ?? 1}
        per_page={params.limit ?? 10}
        total_page={data?.metadata?.last_page ?? 1}
        onPageChange={page => setParams({ ...params, page })}
        onPerPageChange={per_page => setParams({ ...params, limit: per_page, page: 1 })}
        search={params.search}
        onSearchChange={search => setParams({ ...params, search, page: 1 })}
      />
    </Container>
  );
};

export default PasienPage;

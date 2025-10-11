import Container from '@/components/container';
import TitleWithDesc from '@/components/title-with-desc';
import DefaultTable from '@/components/default-table';
import useOperasionalController from './libs/useOperasionalController';
import type { IOperationalResponse } from '@/interface/operational/response';
import Statistic from './components/statistic';
import Filter from './components/filter';
import ModalDetail from './components/modal-detail';
const OperasionalPage = () => {
  const {
    data,
    isLoading,
    columns,
    params,
    setParams,
    clearFilter,
    onApply,
    isOpenDetail,
    setIsOpenDetail,
    selectedItem,
  } = useOperasionalController();
  return (
    <Container className="py-4 lg:py-8 gap-4">
      <TitleWithDesc
        title="Operasional"
        desc="Fitur ini digunakan untuk melihat, menghapus dan mengubah data operasional"
      />
      <Statistic
        total={data?.metadata?.statistics?.total ?? ''}
        pending={data?.metadata?.statistics?.pending ?? 0}
        success={data?.metadata?.statistics?.success ?? ''}
        failed={data?.metadata?.statistics?.failed ?? ''}
        total_modal={data?.metadata?.statistics?.total_modal ?? ''}
        total_non_modal={data?.metadata?.statistics?.total_non_modal ?? ''}
      />

      <DefaultTable<IOperationalResponse>
        filter={
          <Filter
            onReset={clearFilter}
            onApply={onApply}
            filter={{
              type: params.type ?? null,
              tanggalAwal: params.start_date ? new Date(params.start_date) : null,
              tanggalAkhir: params.end_date ? new Date(params.end_date) : null,
              statusFilter: params.status ?? null,
            }}
          />
        }
        data={Array.isArray(data?.metadata?.data) ? data.metadata.data : []}
        columns={columns}
        page={params.page ?? 1}
        per_page={params.limit ?? 10}
        total_page={data?.metadata?.last_page ?? 1}
        onPageChange={newPage => setParams({ ...params, page: newPage })}
        onPerPageChange={newPerPage => setParams({ ...params, limit: newPerPage, page: 1 })}
        isLoading={isLoading}
        search={params.search}
        onSearchChange={newSearch => setParams({ ...params, search: newSearch, page: 1 })}
        defaultShowDataMobile={3}
      />
      <ModalDetail
        isOpen={isOpenDetail}
        onClose={() => setIsOpenDetail(false)}
        data={selectedItem as IOperationalResponse}
      />
    </Container>
  );
};

export default OperasionalPage;

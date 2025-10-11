import Container from '@/components/container';
import TitleWithDesc from '@/components/title-with-desc';
import DefaultTable from '@/components/default-table';
import type { ITransaksiResponse } from '@/interface/transaksi/response';
import useTransaksiController from './libs/useTransaksiController';
import Statistic from './components/statistic';
import Filter from './components/filter';
import ModalDetail from './components/modal-detail';

const TransaksiPage = () => {
  const {
    data,
    isLoading,
    columns,
    params,
    setParams,
    clearFilter,
    onApply,
    modalDetail,
    setModalDetail,
    selectedItem,
  } = useTransaksiController();
  return (
    <Container className="py-4 lg:py-8 gap-4">
      <TitleWithDesc
        title="Transaksi"
        desc="Fitur ini digunakan untuk melihat, menghapus dan mengubah data transaksi"
      />
      <Statistic
        total={data?.metadata?.statistics?.total ?? ''}
        pending={data?.metadata?.statistics?.pending ?? 0}
        success={data?.metadata?.statistics?.success ?? ''}
        failed={data?.metadata?.statistics?.failed ?? ''}
        total_modal={data?.metadata?.statistics?.total_modal ?? 0}
      />
      <DefaultTable<ITransaksiResponse>
        filter={
          <Filter
            onReset={clearFilter}
            onApply={onApply}
            filter={{
              dokter: params.docter_id?.toString() ?? null,
              dantel: params.dantel_id?.toString() ?? null,
              tanggalAwal: params.start_date ? new Date(params.start_date) : null,
              tanggalAkhir: params.end_date ? new Date(params.end_date) : null,
              statusFilter: params.status ?? null,
            }}
          />
        }
        defaultShowDataMobile={3}
        data={Array.isArray(data?.metadata?.data) ? data.metadata.data : []}
        columns={columns}
        isLoading={isLoading}
        page={params.page ?? 1}
        per_page={params.limit ?? 10}
        total_page={data?.metadata?.last_page ?? 1}
        onPageChange={newPage => setParams({ ...params, page: newPage })}
        onPerPageChange={newPerPage => setParams({ ...params, limit: newPerPage, page: 1 })}
        search={params.search}
        onSearchChange={newSearch => setParams({ ...params, search: newSearch, page: 1 })}
      />
      <ModalDetail
        isOpen={modalDetail}
        onClose={() => setModalDetail(false)}
        data={selectedItem as ITransaksiResponse}
      />
    </Container>
  );
};

export default TransaksiPage;

import Container from '@/components/container';
import DefaultTable from '@/components/default-table';
import type { IFeeDistributionResponse } from '@/interface/fee-distributions/response';
import useFeeDistributionsController from './libs/useFeeDistributionsController';
import TitleWithDesc from '@/components/title-with-desc';
import Statistics from './components/statistics';
import type { IStatisticsProps } from './components/statistics';
import Filter from './components/filter';
import ModalDetail from './components/modal-detail';

const FeeDistributions = () => {
  const {
    data,
    columns,
    isLoading,
    params,
    setParams,
    clearFilter,
    onApply,
    modalDetail,
    setModalDetail,
    selectedItem,
  } = useFeeDistributionsController();

  return (
    <Container className="py-4 gap-4 lg:py-8">
      <TitleWithDesc
        title="Fee Distribution"
        desc="Fitur ini digunakan untuk melihat data fee distribution"
      />
      <Statistics data={data?.metadata?.statistics as IStatisticsProps['data']} />
      <DefaultTable<IFeeDistributionResponse>
        filter={
          <Filter
            onReset={() => clearFilter()}
            onApply={onApply}
            filter={{
              additionalFee: params.recipient_type ?? null,
              dokter: params.recipient_id ? params.recipient_id.toString() : null,
              dantel: params.recipient_id ? params.recipient_id.toString() : null,
              start_date: params.start_date ? new Date(params.start_date) : null,
              end_date: params.end_date ? new Date(params.end_date) : null,
            }}
          />
        }
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
        data={selectedItem as IFeeDistributionResponse}
      />
    </Container>
  );
};

export default FeeDistributions;

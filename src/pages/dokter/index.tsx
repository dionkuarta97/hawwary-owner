import Container from '@/components/container';
import DefaultTable from '@/components/default-table';
import StatisticWithValue from '@/components/statistic-with-value';
import TitleWithDesc from '@/components/title-with-desc';
import type { IDokterResponse } from '@/interface/dokter/response';
import useDokterController from './libs/useDokterController';

const DokterPage = () => {
  const { data, isLoading, columns, params, setParams } = useDokterController();
  return (
    <Container className="py-4 lg:py-8 gap-4">
      <TitleWithDesc
        title="Kelola Dokter"
        desc="Fitur ini digunakan untuk mengatur, menambah, menghapus dan mengubah data dokter"
      />
      <StatisticWithValue title="Total Dokter" value={`${data?.metadata?.total ?? 0}`} />
      <DefaultTable<IDokterResponse>
        data={Array.isArray(data?.metadata?.data) ? data.metadata.data : []}
        columns={columns}
        isLoading={isLoading}
        page={params.page ?? 1}
        per_page={params.per_page ?? 10}
        total_page={data?.metadata?.last_page ?? 1}
        defaultShowDataMobile={1}
        onPageChange={newPage => setParams({ ...params, page: newPage })}
        onPerPageChange={newPerPage => setParams({ ...params, per_page: newPerPage })}
        search={params.search}
        onSearchChange={newSearch => setParams({ ...params, search: newSearch })}
      />
    </Container>
  );
};

export default DokterPage;

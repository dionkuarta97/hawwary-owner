import Container from '@/components/container';
import usePembagianOtomatisController from './libs/usePembagianOtomatisController';
import DefaultTable from '@/components/default-table';
import type { IPembagianOtomatisResponse } from '@/interface/pembagian-otomatis/response';
import TitleWithDesc from '@/components/title-with-desc';
import { Button } from '@material-tailwind/react';
import { Plus } from 'iconoir-react';
import FormModal from './components/form-modal';
import ModalConfirmation from '@/components/modal-confirmation';
import StatisticWithValue from '@/components/statistic-with-value';

const PembagianOtomatis = () => {
  const {
    data,
    isLoading,
    columns,
    params,
    setParams,
    modalAdd,
    setModalAdd,
    modalDelete,
    setModalDelete,
    handleDeletePembagianOtomatis,
    idDelete,
    setIdDelete,
    selectedItem,
    setSelectedItem,
  } = usePembagianOtomatisController();
  return (
    <Container className="py-4 lg:py-8 gap-4">
      <ModalConfirmation
        message="Apakah anda yakin ingin menghapus pembagian otomatis?"
        isOpen={modalDelete}
        setIsOpen={setModalDelete}
        onAccept={() => {
          handleDeletePembagianOtomatis(idDelete as number);
        }}
        onDecline={() => {
          setIdDelete(null);
          setModalDelete(false);
        }}
      />
      <FormModal
        isOpen={modalAdd}
        setIsOpen={setModalAdd}
        detail={selectedItem as IPembagianOtomatisResponse | undefined}
        onClose={() => {
          setModalAdd(false);
          setSelectedItem(null);
        }}
      />
      <TitleWithDesc
        title="Pembagian Otomatis"
        desc="Fitur ini digunakan untuk mengatur pembagian otomatis untuk setiap transaksi"
      />
      <Button className="w-fit cursor-pointer" onClick={() => setModalAdd(true)}>
        <Plus className="mr-1 h-4 w-4 stroke-2" />
        Tambah Pembagian Otomatis
      </Button>
      <StatisticWithValue
        title="Total Persentase"
        value={`${data?.metadata?.statistics?.total_percentage ?? 0}%`}
      />
      <DefaultTable<IPembagianOtomatisResponse>
        data={Array.isArray(data?.metadata?.data) ? data.metadata.data : []}
        columns={columns}
        isLoading={isLoading}
        page={params.page ?? 1}
        per_page={params.per_page ?? 10}
        total_page={data?.metadata?.last_page ?? 1}
        onPageChange={newPage => setParams({ ...params, page: newPage })}
        onPerPageChange={newPerPage => setParams({ ...params, per_page: newPerPage })}
        search={params.search}
        onSearchChange={newSearch => setParams({ ...params, search: newSearch })}
      />
    </Container>
  );
};

export default PembagianOtomatis;

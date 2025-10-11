import Container from '@/components/container';
import DefaultTable from '@/components/default-table';
import StatisticWithValue from '@/components/statistic-with-value';
import TitleWithDesc from '@/components/title-with-desc';
import type { IDokterResponse } from '@/interface/dokter/response';
import useDokterController from './libs/useDokterController';
import { Plus } from 'iconoir-react';
import { Button } from '@material-tailwind/react';
import FormModal from './components/form-modal';
import ModalConfirmation from '@/components/modal-confirmation';

const DokterPage = () => {
  const {
    data,
    isLoading,
    columns,
    params,
    setParams,
    modalAdd,
    setModalAdd,
    modalEdit,
    setModalEdit,
    modalDelete,
    setModalDelete,

    idDelete,

    selectedItem,

    handleDeleteDokter,
  } = useDokterController();

  return (
    <Container className="py-4 lg:py-8 gap-4">
      <ModalConfirmation
        message="Apakah anda yakin ingin menghapus dokter?"
        isOpen={modalDelete}
        setIsOpen={setModalDelete}
        onAccept={() => handleDeleteDokter(idDelete as number)}
        onDecline={() => setModalDelete(false)}
      />
      <TitleWithDesc
        title="Kelola Dokter"
        desc="Fitur ini digunakan untuk mengatur, menambah, menghapus dan mengubah data dokter"
      />
      <Button className="w-fit cursor-pointer" onClick={() => setModalAdd(true)}>
        <Plus className="mr-1 h-4 w-4 stroke-2" />
        Tambah Dokter
      </Button>
      <StatisticWithValue title="Total Dokter" value={`${data?.metadata?.total ?? 0}`} />
      <DefaultTable<IDokterResponse>
        data={Array.isArray(data?.metadata?.data) ? data.metadata.data : []}
        columns={columns}
        isLoading={isLoading}
        page={params.page ?? 1}
        per_page={params.limit ?? 10}
        total_page={data?.metadata?.last_page ?? 1}
        defaultShowDataMobile={1}
        onPageChange={newPage => setParams({ ...params, page: newPage })}
        onPerPageChange={newPerPage => setParams({ ...params, limit: newPerPage, page: 1 })}
        search={params.search}
        onSearchChange={newSearch => setParams({ ...params, search: newSearch })}
      />
      <FormModal isOpen={modalAdd} setIsOpen={setModalAdd} onClose={() => setModalAdd(false)} />
      <FormModal
        isOpen={modalEdit}
        setIsOpen={setModalEdit}
        onClose={() => setModalEdit(false)}
        detail={selectedItem as IDokterResponse | undefined}
      />
    </Container>
  );
};

export default DokterPage;

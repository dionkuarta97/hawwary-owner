import Container from '@/components/container';
import TitleWithDesc from '@/components/title-with-desc';
import type { IStaffResponse } from '@/interface/staff/response';
import DefaultTable from '@/components/default-table';
import useStaffController from './libs/useStaffController';
import { Plus } from 'iconoir-react';
import { Button } from '@material-tailwind/react';
import FormAddModal from './components/form-add-modal';
import FormEditModal from './components/form-edit-modal';
import ModalConfirmation from '@/components/modal-confirmation';

const StaffPage = () => {
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
    selectedItem,
    setSelectedItem,
    modalDeleteConfirmation,
    setModalDeleteConfirmation,
    handleDeleteStaff,
  } = useStaffController();
  return (
    <Container className="py-4 lg:py-8 gap-4">
      <TitleWithDesc
        title="Kelola Staff"
        desc="Fitur ini digunakan untuk mengatur, menambah, menghapus dan mengubah data staff"
      />
      <Button className="w-fit cursor-pointer" onClick={() => setModalAdd(true)}>
        <Plus className="mr-1 h-4 w-4 stroke-2" />
        Tambah Akun
      </Button>
      <DefaultTable<IStaffResponse>
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
      <FormAddModal isOpen={modalAdd} onClose={() => setModalAdd(false)} />
      <FormEditModal
        isOpen={modalEdit}
        onClose={() => {
          setModalEdit(false);
          setSelectedItem(null);
        }}
        detail={selectedItem as IStaffResponse | undefined}
      />
      <ModalConfirmation
        message="Apakah anda yakin ingin menghapus staff?"
        isOpen={modalDeleteConfirmation}
        setIsOpen={setModalDeleteConfirmation}
        onAccept={() => handleDeleteStaff(selectedItem?.id as number)}
        onDecline={() => setModalDeleteConfirmation(false)}
      />
    </Container>
  );
};

export default StaffPage;

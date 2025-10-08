import DefaultModal from '@/components/default-modal';
import InputWithLabel from '@/components/input-with-label';
import useFormModalController from '../../libs/useFormModalController';
import ModalConfirmation from '@/components/modal-confirmation';
import type { IDokterResponse } from '@/interface/dokter/response';

interface IFormModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClose: () => void;
  detail?: IDokterResponse;
}

const FormModal = (props: IFormModalProps) => {
  const { isOpen, setIsOpen, onClose, detail } = props;
  const {
    form,
    handleChangeForm,
    handleCreateDokter,
    isOpenConfirmation,
    setIsOpenConfirmation,
    clearForm,
  } = useFormModalController({ detail });
  return (
    <>
      <ModalConfirmation
        onDecline={() => {
          setIsOpenConfirmation(false);
        }}
        message={
          detail
            ? 'Apakah anda yakin ingin mengedit dokter?'
            : 'Apakah anda yakin ingin menambahkan dokter?'
        }
        isOpen={isOpenConfirmation}
        setIsOpen={setIsOpenConfirmation}
        onAccept={() => {
          handleCreateDokter();
          setIsOpenConfirmation(false);
          setIsOpen(false);
          clearForm();
        }}
      />
      <DefaultModal
        title={detail ? 'Edit Dokter' : 'Tambah Dokter'}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setIsOpen(false);
          clearForm();
        }}
        onAccept={() => {
          setIsOpenConfirmation(true);
        }}
        onDecline={() => {
          onClose();
          setIsOpen(false);
          clearForm();
        }}
        isDisabledAccept={Object.values(form).some(value => value === '')}
      >
        <InputWithLabel
          label="Nama"
          placeholder="Masukkan nama dokter"
          value={form.name}
          onChange={e => handleChangeForm(e.target.value, 'name')}
        />
      </DefaultModal>
    </>
  );
};

export default FormModal;

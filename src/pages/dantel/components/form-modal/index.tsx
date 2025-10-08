import DefaultModal from '@/components/default-modal';
import InputWithLabel from '@/components/input-with-label';
import useFormModalController from '../../libs/useFormModalController';
import ModalConfirmation from '@/components/modal-confirmation';
import type { IDantelResponse } from '@/interface/dantel/response';

interface IFormModalDantelProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClose: () => void;
  detail?: IDantelResponse;
}

const FormModal = (props: IFormModalDantelProps) => {
  const { isOpen, setIsOpen, onClose, detail } = props;
  const {
    form,
    handleChangeForm,
    handleCreateDantel,
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
            ? 'Apakah anda yakin ingin mengedit dantel?'
            : 'Apakah anda yakin ingin menambahkan dantel?'
        }
        isOpen={isOpenConfirmation}
        setIsOpen={setIsOpenConfirmation}
        onAccept={() => {
          handleCreateDantel();
          setIsOpenConfirmation(false);
          setIsOpen(false);
          clearForm();
        }}
      />
      <DefaultModal
        title={detail ? 'Edit Dantel' : 'Tambah Dantel'}
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
          placeholder="Masukkan nama dantel"
          value={form.name}
          onChange={e => handleChangeForm(e.target.value, 'name')}
        />
      </DefaultModal>
    </>
  );
};

export default FormModal;

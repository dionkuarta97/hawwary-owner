import DefaultModal from '@/components/default-modal';
import useFormModalController from '../../libs/useFormModalController';
import InputWithLabel from '@/components/input-with-label';
import ModalConfirmation from '@/components/modal-confirmation';
import type { IPembagianOtomatisResponse } from '@/interface/pembagian-otomatis/response';

interface IFormModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  detail?: IPembagianOtomatisResponse;
  onClose: () => void;
}

const FormModal = (props: IFormModalProps) => {
  const { isOpen, setIsOpen, detail, onClose } = props;
  const {
    form,
    handleChangeForm,
    disableButton,
    clearForm,
    isOpenConfirmation,
    setIsOpenConfirmation,
    handleCreatePembagianOtomatis,
  } = useFormModalController({ detail });
  return (
    <>
      <DefaultModal
        title={detail ? 'Edit Pembagian Otomatis' : 'Tambah Pembagian Otomatis'}
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
        isDisabledAccept={disableButton}
      >
        <div className="flex flex-col gap-2">
          <ModalConfirmation
            message={
              detail
                ? 'Apakah anda yakin ingin mengedit pembagian otomatis?'
                : 'Apakah anda yakin ingin menambahkan pembagian otomatis?'
            }
            isOpen={isOpenConfirmation}
            setIsOpen={setIsOpenConfirmation}
            onAccept={() => {
              onClose();
              handleCreatePembagianOtomatis();
              clearForm();
              setIsOpenConfirmation(false);
              setIsOpen(false);
            }}
            onDecline={() => {
              setIsOpenConfirmation(false);
            }}
          />
          <InputWithLabel
            placeholder="Masukkan nama pembagian otomatis"
            label="Nama"
            value={form.name}
            onChange={e => handleChangeForm(e.target.value, 'name')}
            required
          />
          <InputWithLabel
            label="Persentase"
            type="number"
            placeholder="Masukkan persentase pembagian otomatis"
            value={form.percentage ? form.percentage.toString() : ''}
            onChange={e => handleChangeForm(e.target.value, 'percentage')}
            required
          />
        </div>
      </DefaultModal>
    </>
  );
};

export default FormModal;

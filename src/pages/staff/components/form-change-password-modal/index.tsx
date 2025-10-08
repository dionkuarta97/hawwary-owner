import DefaultModal from '@/components/default-modal';
import ModalConfirmation from '@/components/modal-confirmation';
import useFormChangePasswordController from '../../libs/useFormChangePasswordController';
import InputPassword from '@/components/input-password';

interface IFormChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  id?: number;
  onAccept: () => void;
}

const FormChangePasswordModal = (props: IFormChangePasswordModalProps) => {
  const { isOpen, onClose, id, onAccept } = props;
  const {
    form,
    handleChangeForm,
    handleChangePasswordStaff,
    disableButton,
    isOpenConfirmation,
    setIsOpenConfirmation,
    clearForm,
  } = useFormChangePasswordController({ id });
  return (
    <DefaultModal
      title="Ganti Password"
      isOpen={isOpen}
      onClose={() => {
        onClose();
        clearForm();
      }}
      isDisabledAccept={disableButton}
      onAccept={() => {
        setIsOpenConfirmation(true);
      }}
      onDecline={() => {
        onClose();
        clearForm();
      }}
    >
      <div className="flex flex-col gap-2">
        <InputPassword
          label="Password Baru"
          placeholder="Masukkan password baru"
          value={form.new_password}
          onChange={e => handleChangeForm(e.target.value, 'new_password')}
        />
        <InputPassword
          label="Konfirmasi Password"
          placeholder="Masukkan konfirmasi password"
          value={form.new_password_confirmation}
          onChange={e => handleChangeForm(e.target.value, 'new_password_confirmation')}
        />
      </div>
      <ModalConfirmation
        message="Apakah anda yakin ingin mengganti password?"
        isOpen={isOpenConfirmation}
        setIsOpen={setIsOpenConfirmation}
        onAccept={() => {
          handleChangePasswordStaff();
          onClose();
          onAccept();
          setIsOpenConfirmation(false);
        }}
        onDecline={() => {
          setIsOpenConfirmation(false);
        }}
      />
    </DefaultModal>
  );
};

export default FormChangePasswordModal;

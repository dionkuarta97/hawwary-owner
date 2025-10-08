import DefaultModal from '@/components/default-modal';
import InputWithLabel from '@/components/input-with-label';
import useFormAddController from '../../libs/useFormAddController';
import ModalConfirmation from '@/components/modal-confirmation';
import InputPassword from '@/components/input-password';

interface IFormAddModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const FormAddModal = (props: IFormAddModalProps) => {
  const { isOpen, onClose } = props;
  const {
    form,
    handleChangeForm,
    handleCreateStaff,
    clearForm,
    disableButton,
    isOpenConfirmation,
    setIsOpenConfirmation,
  } = useFormAddController();
  return (
    <DefaultModal
      onAccept={() => {
        setIsOpenConfirmation(true);
      }}
      onDecline={() => {
        onClose();
        clearForm();
      }}
      title="Tambah Akun"
      isOpen={isOpen}
      onClose={() => {
        onClose();
        clearForm();
      }}
      isDisabledAccept={disableButton}
    >
      <ModalConfirmation
        message="Apakah anda yakin ingin menambahkan staff?"
        isOpen={isOpenConfirmation}
        setIsOpen={setIsOpenConfirmation}
        onAccept={() => {
          handleCreateStaff();
          onClose();
          setIsOpenConfirmation(false);
        }}
        onDecline={() => setIsOpenConfirmation(false)}
      />
      <div className="flex flex-col gap-2">
        <InputWithLabel
          label="Nama"
          placeholder="Masukkan nama staff"
          value={form.name}
          onChange={e => handleChangeForm(e.target.value, 'name')}
        />
        <InputWithLabel
          label="Username"
          placeholder="Masukkan username staff"
          value={form.username}
          onChange={e => handleChangeForm(e.target.value, 'username')}
        />
        <InputPassword
          label="Password"
          placeholder="Masukkan password staff"
          value={form.password}
          onChange={e => handleChangeForm(e.target.value, 'password')}
        />
      </div>
    </DefaultModal>
  );
};

export default FormAddModal;

import DefaultModal from '@/components/default-modal';

import type { IStaffResponse } from '@/interface/staff/response';

import useFormEditController from '../../libs/useFormEditController';
import InputWithLabel from '@/components/input-with-label';
import ModalConfirmation from '@/components/modal-confirmation';
import { Button } from '@material-tailwind/react';
import FormChangePasswordModal from '../form-change-password-modal';

interface IFormEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  detail?: IStaffResponse;
}

const FormEditModal = (props: IFormEditModalProps) => {
  const { isOpen, onClose, detail } = props;
  const {
    form,
    handleChangeForm,
    handleUpdateStaff,
    clearForm,
    disableButton,
    isOpenConfirmation,
    setIsOpenConfirmation,
    isOpenChangePassword,
    setIsOpenChangePassword,
  } = useFormEditController({ detail });

  return (
    <DefaultModal
      title="Edit Staff"
      isOpen={isOpen}
      onClose={() => {
        onClose();
        clearForm();
      }}
      onAccept={() => {
        setIsOpenConfirmation(true);
      }}
      onDecline={() => {
        onClose();
        clearForm();
      }}
      isDisabledAccept={disableButton}
    >
      <ModalConfirmation
        message="Apakah anda yakin ingin mengedit staff?"
        isOpen={isOpenConfirmation}
        setIsOpen={setIsOpenConfirmation}
        onAccept={() => {
          handleUpdateStaff();
          onClose();
          setIsOpenConfirmation(false);
        }}
        onDecline={() => {
          setIsOpenConfirmation(false);
        }}
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
        <Button className="cursor-pointer my-2" onClick={() => setIsOpenChangePassword(true)}>
          Ganti Password
        </Button>
      </div>
      <FormChangePasswordModal
        isOpen={isOpenChangePassword}
        onClose={() => {
          setIsOpenChangePassword(false);
        }}
        onAccept={() => {
          onClose();
        }}
        id={detail?.id}
      />
    </DefaultModal>
  );
};

export default FormEditModal;

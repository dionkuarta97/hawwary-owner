import { useState } from 'react';
import { useOpenCloseModal } from '@/hooks';
import { useChangePasswordStaff } from '@/hooks/staff';

interface IFormChangePasswordControllerProps {
  id?: number;
}

const useFormChangePasswordController = (props: IFormChangePasswordControllerProps) => {
  const { id } = props;
  const [form, setForm] = useState({
    new_password: '',
    new_password_confirmation: '',
  });
  const handleChangeForm = (value: string, name: string) => {
    setForm({ ...form, [name]: value });
  };
  const clearForm = () => {
    setForm({ new_password: '', new_password_confirmation: '' });
  };
  const { isOpen: isOpenConfirmation, setIsOpen: setIsOpenConfirmation } = useOpenCloseModal();
  const disableButton = Object.values(form).some(value => value === '');
  const { changePasswordStaff } = useChangePasswordStaff();
  const handleChangePasswordStaff = async () => {
    await changePasswordStaff({ id: id ?? 0, data: form });
    clearForm();
  };
  return {
    form,
    handleChangeForm,
    clearForm,
    disableButton,
    isOpenConfirmation,
    setIsOpenConfirmation,
    handleChangePasswordStaff,
  };
};

export default useFormChangePasswordController;

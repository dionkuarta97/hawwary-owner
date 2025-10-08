import { useOpenCloseModal } from '@/hooks';
import { useCreateStaff } from '@/hooks/staff';
import { useState } from 'react';

const useFormAddController = () => {
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
  });
  const handleChangeForm = (value: string, name: string) => {
    setForm({ ...form, [name]: value });
  };
  const clearForm = () => {
    setForm({
      name: '',
      username: '',
      password: '',
    });
  };
  const disableButton = Object.values(form).some(value => value === '');
  const { isOpen: isOpenConfirmation, setIsOpen: setIsOpenConfirmation } = useOpenCloseModal();
  const { createStaff } = useCreateStaff();
  const handleCreateStaff = async () => {
    await createStaff(form);
    clearForm();
  };
  return {
    form,
    handleChangeForm,
    handleCreateStaff,
    clearForm,
    disableButton,
    isOpenConfirmation,
    setIsOpenConfirmation,
  };
};

export default useFormAddController;

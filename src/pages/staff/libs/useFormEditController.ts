import { useEffect, useState } from 'react';
import { useOpenCloseModal } from '@/hooks';
import { useUpdateStaff } from '@/hooks/staff';
import type { IStaffResponse } from '@/interface/staff/response';

interface IFormEditControllerProps {
  detail?: IStaffResponse;
}
const useFormEditController = (props: IFormEditControllerProps) => {
  const { detail } = props;
  const [form, setForm] = useState({
    name: detail?.name ?? '',
    username: detail?.username ?? '',
  });
  const handleChangeForm = (value: string, name: string) => {
    setForm({ ...form, [name]: value });
  };
  const clearForm = () => {
    setForm({ name: detail?.name ?? '', username: detail?.username ?? '' });
  };
  const disableButton = Object.values(form).some(value => value === '');
  const { isOpen: isOpenConfirmation, setIsOpen: setIsOpenConfirmation } = useOpenCloseModal();
  const { isOpen: isOpenChangePassword, setIsOpen: setIsOpenChangePassword } = useOpenCloseModal();
  const { updateStaff } = useUpdateStaff();
  const handleUpdateStaff = async () => {
    await updateStaff({ id: detail?.id ?? 0, data: form });
    clearForm();
  };
  useEffect(() => {
    if (detail) {
      setForm({ name: detail.name, username: detail.username });
    }
  }, [detail]);
  return {
    form,
    handleChangeForm,
    clearForm,
    disableButton,
    isOpenConfirmation,
    setIsOpenConfirmation,
    isOpenChangePassword,
    setIsOpenChangePassword,
    handleUpdateStaff,
  };
};

export default useFormEditController;

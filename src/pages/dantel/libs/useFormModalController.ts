import { useEffect, useState } from 'react';
import { useCreateDantel, useUpdateDantel } from '@/hooks/dantel';
import { useOpenCloseModal } from '@/hooks';
import type { IDantelResponse } from '@/interface/dantel/response';

interface IFormModalDantelProps {
  detail?: IDantelResponse;
}

const useFormModalController = (props: IFormModalDantelProps) => {
  const { detail } = props;
  const [form, setForm] = useState({
    name: '',
  });
  const { isOpen: isOpenConfirmation, setIsOpen: setIsOpenConfirmation } = useOpenCloseModal();
  const { createDantel } = useCreateDantel();
  const { updateDantel } = useUpdateDantel();
  const handleChangeForm = (value: string, name: string) => {
    setForm({ ...form, [name]: value });
  };
  const handleCreateDantel = async () => {
    if (detail) {
      await updateDantel({ id: detail.id, data: form });
    } else {
      await createDantel(form);
    }
  };
  const clearForm = () => {
    setForm({ name: '' });
  };
  useEffect(() => {
    if (detail) {
      setForm({ name: detail.name });
    }
  }, [detail]);
  return {
    form,
    handleChangeForm,
    handleCreateDantel,
    isOpenConfirmation,
    setIsOpenConfirmation,
    clearForm,
  };
};

export default useFormModalController;

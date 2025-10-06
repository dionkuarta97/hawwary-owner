import { useEffect, useState } from 'react';
import { useCreateDokter, useUpdateDokter } from '@/hooks/dokter';
import { useOpenCloseModal } from '@/hooks';
import type { IDokterResponse } from '@/interface/dokter/response';

interface IFormModalProps {
  detail?: IDokterResponse;
}

const useFormModalController = (props: IFormModalProps) => {
  const { detail } = props;
  const [form, setForm] = useState({
    name: '',
  });
  const { isOpen: isOpenConfirmation, setIsOpen: setIsOpenConfirmation } = useOpenCloseModal();
  const { createDokter } = useCreateDokter();
  const { updateDokter } = useUpdateDokter();
  const handleChangeForm = (value: string, name: string) => {
    setForm({ ...form, [name]: value });
  };
  const handleCreateDokter = async () => {
    if (detail) {
      await updateDokter({ id: detail.id, data: form });
    } else {
      await createDokter(form);
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
    handleCreateDokter,
    isOpenConfirmation,
    setIsOpenConfirmation,
    clearForm,
  };
};

export default useFormModalController;

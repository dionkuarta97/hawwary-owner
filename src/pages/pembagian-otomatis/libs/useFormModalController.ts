import { useEffect, useState } from 'react';
import { useOpenCloseModal } from '@/hooks';
import { useCreatePembagianOtomatis, useUpdatePembagianOtomatis } from '@/hooks/pembagian-otomatis';
import type { IPembagianOtomatisResponse } from '@/interface/pembagian-otomatis/response';

interface IFormModalProps {
  detail?: IPembagianOtomatisResponse;
}

const useFormModalController = (props: IFormModalProps) => {
  const { detail } = props;
  const [form, setForm] = useState({
    name: '',
    percentage: 0,
  });
  const { isOpen: isOpenConfirmation, setIsOpen: setIsOpenConfirmation } = useOpenCloseModal();
  const handleChangeForm = (value: string, name: string) => {
    setForm({ ...form, [name]: value });
  };
  const disableButton =
    Object.values(form).some(value => value === '') || (form.percentage as number) <= 0;
  const clearForm = () => {
    setForm({ name: '', percentage: 0 });
  };
  const { createPembagianOtomatis } = useCreatePembagianOtomatis();
  const { updatePembagianOtomatis } = useUpdatePembagianOtomatis();
  const handleCreatePembagianOtomatis = async () => {
    if (detail) {
      await updatePembagianOtomatis({
        id: detail.id,
        data: {
          name: form.name,
          percentage: form.percentage as number,
        },
      });
    } else {
      await createPembagianOtomatis({
        name: form.name,
        percentage: form.percentage as number,
      });
    }
  };

  useEffect(() => {
    if (detail) {
      setForm({ name: detail.name, percentage: detail.percentage as unknown as number });
    }
  }, [detail]);
  return {
    form,
    handleChangeForm,
    disableButton,
    clearForm,
    isOpenConfirmation,
    setIsOpenConfirmation,
    handleCreatePembagianOtomatis,
  };
};

export default useFormModalController;

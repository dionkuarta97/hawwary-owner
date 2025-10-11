import { useEffect, useState } from 'react';
import type { IPasienResponse } from '@/interface/pasien/response';
import type { IPasienEditRequest } from '@/interface/pasien/request';
import { useUpdatePasien } from '@/hooks/pasien';

const useModalEditController = (pasien: IPasienResponse) => {
  const [form, setForm] = useState<IPasienEditRequest>({
    nama: '',
    domisili: '',
    tanggal_lahir: '',
    no_hp: '',
    jenis_kelamin: '',
    nik: '',
  });
  const { updatePasien } = useUpdatePasien();
  const handleChangeForm = (value: string, name: string) => {
    setForm({ ...form, [name]: value });
  };
  useEffect(() => {
    if (pasien) {
      setForm({
        nama: pasien?.nama,
        domisili: pasien?.domisili,
        tanggal_lahir: pasien.tanggal_lahir,
        no_hp: pasien?.no_hp ?? '',
        jenis_kelamin: pasien?.jenis_kelamin,
        nik: pasien?.nik ?? '',
      });
    }
  }, [pasien]);

  const clearForm = () => {
    setForm({
      nama: pasien?.nama,
      domisili: pasien.domisili,
      tanggal_lahir: pasien.tanggal_lahir,
      no_hp: pasien?.no_hp ?? '',
      jenis_kelamin: pasien?.jenis_kelamin,
      nik: pasien?.nik ?? '',
    });
  };
  const handleUpdatePasien = async () => {
    await updatePasien({ id: pasien?.id ?? 0, data: form });
  };
  const disableButton = !form.nama || !form.domisili || !form.tanggal_lahir || !form.jenis_kelamin;
  return {
    handleChangeForm,
    clearForm,
    form,
    disableButton,
    handleUpdatePasien,
  };
};

export default useModalEditController;

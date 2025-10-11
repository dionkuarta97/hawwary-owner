import DefaultModal from '@/components/default-modal';
import InputWithLabel from '@/components/input-with-label';
import type { IPasienResponse } from '@/interface/pasien/response';
import useModalEditController from '../../libs/useModalEditController';
import DatePicker from '@/components/default-date-picker';
import DefaultSelect from '@/components/default-select';

interface IModalEditProps {
  isOpen: boolean;
  onClose: () => void;
  pasien: IPasienResponse;
}

const ModalEdit = ({ isOpen, onClose, pasien }: IModalEditProps) => {
  const { form, handleChangeForm, clearForm, disableButton, handleUpdatePasien } =
    useModalEditController(pasien);
  return (
    <DefaultModal
      onAccept={async () => {
        await handleUpdatePasien();
        onClose();
        clearForm();
      }}
      onDecline={() => {
        onClose();
        clearForm();
      }}
      isDisabledAccept={disableButton}
      title="Edit Pasien"
      isOpen={isOpen}
      onClose={() => {
        onClose();
        clearForm();
      }}
    >
      <div className="flex flex-col gap-2">
        <InputWithLabel
          label="Nama"
          value={form.nama}
          placeholder="Nama Pasien"
          onChange={e => handleChangeForm(e.target.value, 'nama')}
        />
        <InputWithLabel
          label="Domisili"
          value={form.domisili}
          placeholder="Domisili Pasien"
          onChange={e => handleChangeForm(e.target.value, 'domisili')}
        />
        <DatePicker
          label="Tanggal Lahir"
          value={form.tanggal_lahir ? new Date(form.tanggal_lahir) : null}
          maxDate={new Date()}
          onChange={date => handleChangeForm(date ? date.toISOString() : '', 'tanggal_lahir')}
        />
        <InputWithLabel
          label="No HP"
          value={form.no_hp}
          placeholder="No HP Pasien"
          onChange={e => handleChangeForm(e.target.value, 'no_hp')}
        />
        <DefaultSelect
          label="Jenis Kelamin"
          value={form.jenis_kelamin ?? ''}
          placeholder="Jenis Kelamin Pasien"
          onSelect={value => handleChangeForm(value, 'jenis_kelamin')}
          options={[
            { label: 'Laki-laki', value: 'L' },
            { label: 'Perempuan', value: 'P' },
          ]}
        />
        <InputWithLabel
          label="NIK"
          value={form.nik}
          placeholder="NIK Pasien"
          onChange={e => handleChangeForm(e.target.value, 'nik')}
        />
        <InputWithLabel
          label="No HP"
          value={form.no_hp}
          placeholder="No HP Pasien"
          onChange={e => handleChangeForm(e.target.value, 'no_hp')}
        />
      </div>
    </DefaultModal>
  );
};

export default ModalEdit;

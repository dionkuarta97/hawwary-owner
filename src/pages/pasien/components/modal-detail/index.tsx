import type { IPasienResponse } from '@/interface/pasien/response';
import DefaultModal from '@/components/default-modal';
import LabelWithValue from '@/interface/label-with-value';
import { formatDate } from 'date-fns';

interface IModalDetailProps {
  isOpen: boolean;
  onClose: () => void;
  data: IPasienResponse;
}

const ModalDetail = ({ isOpen, onClose, data }: IModalDetailProps) => {
  return (
    <DefaultModal
      showAccept={false}
      onDecline={onClose}
      isOpen={isOpen}
      onClose={onClose}
      title="Detail Pasien"
      labelDecline="Tutup"
    >
      <div className="flex flex-col gap-2">
        <LabelWithValue label="Nama" value={data?.nama || '-'} />
        <LabelWithValue label="No RM" value={data?.no_rm.toString() || '-'} />
        <LabelWithValue label="Domisili" value={data?.domisili || '-'} />
        <LabelWithValue
          label="Tanggal Lahir"
          value={formatDate(data?.tanggal_lahir || new Date(), 'dd MMM yyyy')}
        />
        <LabelWithValue label="No HP" value={data?.no_hp || '-'} />
        <LabelWithValue
          label="Jenis Kelamin"
          value={
            data?.jenis_kelamin ? (data?.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan') : '-'
          }
        />
        <LabelWithValue label="NIK" value={data?.nik || '-'} />
        <LabelWithValue
          label="Tanggal Daftar"
          value={formatDate(data?.created_at || new Date(), 'dd MMM yyyy, HH:mm')}
        />
      </div>
    </DefaultModal>
  );
};

export default ModalDetail;

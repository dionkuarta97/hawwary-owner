import DefaultModal from '@/components/default-modal';
import LabelWithValue from '@/interface/label-with-value';
import type { ITransaksiResponse } from '@/interface/transaksi/response';
import { formatDate } from 'date-fns';
import { Badge } from 'flowbite-react';
import { Button } from '@material-tailwind/react';
import { useDeleteTransaksi } from '@/hooks/transaksi';
import { useOpenCloseModal } from '@/hooks';
import ModalConfirmation from '@/components/modal-confirmation';
import DefaultSelect from '@/components/default-select';
import { useEffect, useState } from 'react';
import { useUpdateTransaksiStatus } from '@/hooks/transaksi';

interface IModalDetailTransaksiProps {
  isOpen: boolean;
  onClose: () => void;
  data: ITransaksiResponse;
}

const ModalDetail = ({ isOpen, onClose, data }: IModalDetailTransaksiProps) => {
  const { deleteTransaksi } = useDeleteTransaksi();
  const { updateTransaksiStatus } = useUpdateTransaksiStatus();
  const { isOpen: isOpenDelete, setIsOpen: setIsOpenDelete } = useOpenCloseModal();
  const { isOpen: isOpenEditStatus, setIsOpen: setIsOpenEditStatus } = useOpenCloseModal();
  const [status, setStatus] = useState<string>(data?.status);
  useEffect(() => {
    setStatus(data?.status);
  }, [data?.status]);
  return (
    <>
      <DefaultModal
        isOpen={isOpenEditStatus}
        onClose={() => setIsOpenEditStatus(false)}
        title="Detail Transaksi"
        labelDecline="Tutup"
        onAccept={() => {
          updateTransaksiStatus({
            id: data.id,
            data: { status: status as 'sukses' | 'gagal' | 'pending' },
          });
          setIsOpenEditStatus(false);
          onClose();
        }}
        onDecline={() => setIsOpenEditStatus(false)}
      >
        <DefaultSelect
          placeholder="Pilih Status"
          label="Status"
          options={[
            { label: 'Sukses', value: 'sukses' },
            { label: 'Gagal', value: 'gagal' },
            { label: 'Pending', value: 'pending' },
          ]}
          value={status}
          onSelect={e => setStatus(e)}
        />
      </DefaultModal>
      <ModalConfirmation
        message="Apakah anda yakin ingin menghapus transaksi?"
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        onAccept={() => {
          deleteTransaksi(data.id);
          setIsOpenDelete(false);
          onClose();
        }}
        onDecline={() => setIsOpenDelete(false)}
      />
      <DefaultModal
        showAccept={false}
        onDecline={onClose}
        isOpen={isOpen}
        onClose={onClose}
        title="Detail Transaksi"
        labelDecline="Tutup"
      >
        <div className="flex flex-col gap-2">
          <LabelWithValue label="No Rekam Medis" value={data?.pasien?.no_rm.toString() || '-'} />
          <LabelWithValue label="Nama" value={data?.pasien?.nama || '-'} />
          <LabelWithValue label="Deskripsi" value={data?.description || '-'} />

          <LabelWithValue label="Dantel" value={data?.dantel?.name || '-'} />
          <LabelWithValue label="Dokter" value={data?.docter?.name || '-'} />
          <LabelWithValue
            label="Total Amount"
            value={`Rp. ${Number(data?.total_amount).toLocaleString('id-ID') || '-'}`}
          />
          <LabelWithValue
            label="Net Amount"
            value={`Rp. ${Number(data?.net_amount).toLocaleString('id-ID') || '-'}`}
          />
          {data?.operational && (
            <LabelWithValue
              label="Modal"
              value={`Rp. ${Number(data?.operational?.amount).toLocaleString('id-ID') || '-'}`}
            />
          )}
          {data?.operational && (
            <LabelWithValue label="Modal Name" value={data?.operational?.name || '-'} />
          )}
          {data?.operational && (
            <LabelWithValue label="Modal Deskripsi" value={data?.operational?.description || '-'} />
          )}
          <LabelWithValue
            label="Status"
            content={
              <Badge
                className="w-fit"
                color={
                  data?.status === 'sukses'
                    ? 'success'
                    : data?.status === 'gagal'
                    ? 'failure'
                    : 'warning'
                }
              >
                {data?.status.toUpperCase()}
              </Badge>
            }
          />
          <LabelWithValue
            label="Created At"
            value={formatDate(data?.created_at || new Date(), 'dd MMM yyyy, HH:mm') || '-'}
          />
          <div className="flex flex-row items-center  py-4 gap-2">
            <Button
              className="cursor-pointer w-full"
              color="warning"
              onClick={() => setIsOpenEditStatus(true)}
            >
              Edit Status
            </Button>
            <Button
              className="cursor-pointer w-full"
              color="error"
              onClick={() => setIsOpenDelete(true)}
            >
              Hapus
            </Button>
          </div>
        </div>
      </DefaultModal>
    </>
  );
};

export default ModalDetail;

import DefaultAccordion from '@/components/default-accordion';
import DefaultModal from '@/components/default-modal';
import LabelWithValue from '@/interface/label-with-value';
import type { IOperationalResponse } from '@/interface/operational/response';
import { Badge } from 'flowbite-react';
import { formatDate } from 'date-fns';
import { Button } from '@material-tailwind/react';
import { useDeleteOperational, useUpdateOperationalStatus } from '@/hooks/operational';
import { useOpenCloseModal } from '@/hooks';
import { useEffect, useState } from 'react';
import DefaultSelect from '@/components/default-select';
import ModalConfirmation from '@/components/modal-confirmation';

interface IModalDetailProps {
  isOpen: boolean;
  onClose: () => void;
  data: IOperationalResponse;
}

const ModalDetail = ({ isOpen, onClose, data }: IModalDetailProps) => {
  const { deleteOperational } = useDeleteOperational();
  const { updateOperationalStatus } = useUpdateOperationalStatus();
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
        title="Detail Operasional"
        labelDecline="Tutup"
        onAccept={() => {
          updateOperationalStatus({
            id: data.id,
            status: status as 'success' | 'failed' | 'pending',
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
            { label: 'Sukses', value: 'success' },
            { label: 'Gagal', value: 'failed' },
            { label: 'Pending', value: 'pending' },
          ]}
          value={status}
          onSelect={e => setStatus(e)}
        />
      </DefaultModal>
      <ModalConfirmation
        message="Apakah anda yakin ingin menghapus operasional?"
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        onAccept={() => {
          deleteOperational(data.id);
          setIsOpenDelete(false);
          onClose();
        }}
        onDecline={() => setIsOpenDelete(false)}
      />
      <DefaultModal
        showAccept={false}
        labelDecline="Tutup"
        onDecline={onClose}
        isOpen={isOpen}
        onClose={onClose}
        title="Detail Operasional"
      >
        <div className="flex flex-col gap-2">
          {data?.transaksi_id && (
            <DefaultAccordion
              title="Data Transaksi"
              content={
                <div className="flex flex-col gap-2">
                  <LabelWithValue
                    label="Nama Pasien"
                    value={data?.transaksi?.pasien?.nama || '-'}
                  />
                  <LabelWithValue
                    label="No RM"
                    value={data?.transaksi?.pasien?.no_rm.toString() || '-'}
                  />
                  <LabelWithValue label="Dantel" value={data?.transaksi?.dantel?.name || '-'} />
                  <LabelWithValue label="Dokter" value={data?.transaksi?.docter?.name || '-'} />
                  <LabelWithValue
                    label="Total Amount"
                    value={`Rp. ${
                      Number(data?.transaksi?.total_amount).toLocaleString('id-ID') || '-'
                    }`}
                  />
                  <LabelWithValue
                    label="Net Amount"
                    value={`Rp. ${
                      Number(data?.transaksi?.net_amount).toLocaleString('id-ID') || '-'
                    }`}
                  />
                  <LabelWithValue label="Deskripsi" value={data?.transaksi?.description || '-'} />
                </div>
              }
            />
          )}
          <DefaultAccordion
            title="Detail Operasional"
            content={
              <div className="flex flex-col gap-2">
                <LabelWithValue label="Nama" value={data?.name || '-'} />
                <LabelWithValue label="Deskripsi" value={data?.description || '-'} />
                <LabelWithValue
                  label="Amount"
                  value={`Rp. ${Number(data?.amount).toLocaleString('id-ID') || '-'}`}
                />

                <LabelWithValue
                  label="Status"
                  content={
                    <Badge
                      className="w-fit"
                      color={
                        data?.status === 'success'
                          ? 'success'
                          : data?.status === 'failed'
                          ? 'failure'
                          : 'warning'
                      }
                    >
                      {data?.status.toUpperCase()}
                    </Badge>
                  }
                />
                <LabelWithValue
                  label="Tanggal"
                  value={formatDate(data?.created_at || new Date(), 'dd MMM yyyy, HH:mm') || '-'}
                />
              </div>
            }
          />
          {!data?.transaksi_id && (
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
          )}
        </div>
      </DefaultModal>
    </>
  );
};

export default ModalDetail;

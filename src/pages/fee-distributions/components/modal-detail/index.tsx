import type { IFeeDistributionResponse } from '@/interface/fee-distributions/response';
import DefaultModal from '@/components/default-modal';
import DefaultAccordion from '@/components/default-accordion';
import LabelWithValue from '@/interface/label-with-value';
import { formatDate } from 'date-fns';

interface IModalDetailProps {
  isOpen: boolean;
  onClose: () => void;
  data: IFeeDistributionResponse;
}

const ModalDetail = ({ isOpen, onClose, data }: IModalDetailProps) => {
  return (
    <DefaultModal
      showAccept={false}
      labelDecline="Tutup"
      onDecline={onClose}
      isOpen={isOpen}
      onClose={onClose}
      title="Detail Fee Distribution"
    >
      <div className="flex flex-col">
        <DefaultAccordion
          title="Data Pasien"
          content={
            <div className="flex flex-col gap-2">
              <LabelWithValue
                variant="inline"
                label="Nama"
                value={data?.transaksi?.pasien?.nama || '-'}
              />
              <LabelWithValue
                variant="inline"
                label="No RM"
                value={data?.transaksi?.pasien?.no_rm.toString() || '-'}
              />
            </div>
          }
        />
        <DefaultAccordion
          title="Data Transaksi"
          content={
            <div className="flex flex-col gap-2">
              <LabelWithValue
                variant="inline"
                label="Dokter"
                value={data?.transaksi?.docter?.name || '-'}
              />
              <LabelWithValue
                variant="inline"
                label="Dantel"
                value={data?.transaksi?.dantel?.name || '-'}
              />
              <LabelWithValue
                variant="inline"
                label="Total Amount"
                value={`Rp. ${Number(data?.transaksi?.total_amount || 0).toLocaleString('id-ID')}`}
              />
              <LabelWithValue
                variant="inline"
                label="Net Amount"
                value={`Rp. ${Number(data?.transaksi?.net_amount || 0).toLocaleString('id-ID')}`}
              />
              <LabelWithValue
                variant="inline"
                label="Tanggal Transaksi"
                value={formatDate(data?.transaksi?.created_at || new Date(), 'dd MMM yyyy, HH:mm')}
              />
              <LabelWithValue
                variant="inline"
                label="Deskripsi Transaksi"
                value={data?.transaksi?.description || '-'}
              />
            </div>
          }
        />
        {data?.transaksi?.operational && (
          <DefaultAccordion
            title="Modal"
            content={
              <div className="flex flex-col gap-2">
                <LabelWithValue
                  variant="inline"
                  label="Nama"
                  value={data?.transaksi?.operational?.name || '-'}
                />
                <LabelWithValue
                  variant="inline"
                  label="Amount"
                  value={`Rp. ${Number(data?.transaksi?.operational?.amount || 0).toLocaleString(
                    'id-ID'
                  )}`}
                />
                <LabelWithValue
                  variant="inline"
                  label="Deskripsi"
                  value={data?.transaksi?.operational?.description || '-'}
                />
              </div>
            }
          />
        )}
      </div>
    </DefaultModal>
  );
};

export default ModalDetail;

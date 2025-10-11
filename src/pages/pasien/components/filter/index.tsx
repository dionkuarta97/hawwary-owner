import DefaultSelect from '@/components/default-select';
import { EPasienOrder } from '@/interface/pasien/request';
import { useState } from 'react';
import { Button, Menu } from '@material-tailwind/react';

interface IFilterProps {
  order: EPasienOrder | undefined;
  orderType: 'asc' | 'desc' | undefined;
  onApply: ({
    order,
    orderType,
  }: {
    order: EPasienOrder | undefined;
    orderType: 'asc' | 'desc' | undefined;
  }) => void;
  onReset: () => void;
}

const Filter = ({ onApply, order, orderType, onReset }: IFilterProps) => {
  const [orderLocal, setOrderLocal] = useState<EPasienOrder | undefined>(order);
  const [orderTypeLocal, setOrderTypeLocal] = useState<'asc' | 'desc' | undefined>(orderType);

  return (
    <div className="flex flex-col gap-2">
      <DefaultSelect
        label="Urutkan berdasarkan"
        options={[
          {
            label: 'Tanggal Daftar',
            value: EPasienOrder.CREATED_AT,
          },
          {
            label: 'Order',
            value: EPasienOrder.TOTAL_TRANSAKSI,
          },
        ]}
        placeholder="Pilih Urutan"
        onSelect={order => setOrderLocal(order as EPasienOrder)}
        value={orderLocal ?? ''}
      />
      <DefaultSelect
        disabled={!orderLocal}
        label="Tipe Urutan"
        options={[
          {
            label: 'Ascending',
            value: 'ASC',
          },
          {
            label: 'Descending',
            value: 'DESC',
          },
        ]}
        placeholder="Pilih Urutan"
        onSelect={orderType => setOrderTypeLocal(orderType as 'asc' | 'desc')}
        value={orderTypeLocal ?? ''}
      />
      <div className="flex mt-2 justify-between">
        <Menu.Item className="w-fit h-fit p-0 cursor-pointer">
          <Button
            className="cursor-pointer"
            variant="outline"
            color="secondary"
            onClick={() => {
              setOrderLocal(undefined);
              setOrderTypeLocal(undefined);
              onReset();
            }}
          >
            Reset
          </Button>
        </Menu.Item>
        <div className="flex gap-2">
          <Menu.Item className="w-fit h-fit p-0 cursor-pointer">
            <Button className="cursor-pointer" color="secondary">
              Cancel
            </Button>
          </Menu.Item>
          <Menu.Item className="w-fit h-fit p-0 cursor-pointer">
            <Button
              className="cursor-pointer"
              disabled={!orderLocal || !orderTypeLocal}
              onClick={() => {
                console.log(orderLocal, orderTypeLocal);
                onApply({
                  order: orderLocal as EPasienOrder,
                  orderType: orderTypeLocal as 'asc' | 'desc',
                });
              }}
            >
              Terapkan
            </Button>
          </Menu.Item>
        </div>
      </div>
    </div>
  );
};

export default Filter;

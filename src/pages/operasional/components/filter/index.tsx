import DatePicker from '@/components/default-date-picker';
import DefaultSelect from '@/components/default-select';

import { Button, Menu } from '@material-tailwind/react';
import { useEffect, useMemo, useState } from 'react';

interface IFilterProps {
  onReset: () => void;
  filter: {
    type: string | null;

    tanggalAwal: Date | null;
    tanggalAkhir: Date | null;
    statusFilter: string | null;
  };
  onApply: ({
    type,
    tanggalAwal,
    tanggalAkhir,
    statusFilter,
  }: {
    type: string | null;
    tanggalAwal: Date | null;
    tanggalAkhir: Date | null;
    statusFilter: string | null;
  }) => void;
}

const Filter = ({ onReset, onApply, filter }: IFilterProps) => {
  const [tanggalAwal, setTanggalAwal] = useState<Date | null>(null);
  const [tanggalAkhir, setTanggalAkhir] = useState<Date | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const disableButton = useMemo(() => {
    if (tanggalAwal) {
      return !tanggalAkhir || tanggalAkhir < tanggalAwal;
    }
    return false;
  }, [tanggalAwal, tanggalAkhir]);

  const typeOptions = useMemo(() => {
    let options = [
      {
        label: 'Semua',
        value: '',
      },
      {
        label: 'Modal',
        value: 'modal',
      },
      {
        label: 'Operasional',
        value: 'operasional',
      },
    ];
    return options;
  }, []);

  const statusOptions = useMemo(() => {
    return [
      {
        label: 'Semua',
        value: '',
      },
      {
        label: 'Pending',
        value: 'pending',
      },
      {
        label: 'Gagal',
        value: 'failed',
      },
      {
        label: 'Sukses',
        value: 'success',
      },
    ];
  }, []);

  // Initialize state with filter values
  useEffect(() => {
    setType(filter?.type || null);
    setTanggalAwal(filter?.tanggalAwal ? new Date(filter?.tanggalAwal) : null);
    setTanggalAkhir(filter?.tanggalAkhir ? new Date(filter?.tanggalAkhir) : null);
    setStatus(filter?.statusFilter || null);
  }, [filter]);

  // Reset state when component mounts or filter changes
  useEffect(() => {
    if (filter) {
      setType(filter.type);
      setTanggalAwal(filter.tanggalAwal);
      setTanggalAkhir(filter.tanggalAkhir);
      setStatus(filter.statusFilter);
    }
  }, [filter?.type, filter?.statusFilter, filter?.tanggalAwal, filter?.tanggalAkhir]);
  return (
    <div className="flex flex-col gap-2">
      <DatePicker
        showClearButton
        key={`tanggalAwal-${tanggalAwal}`}
        label="Tanggal Awal"
        placeholder="Tanggal Awal"
        value={tanggalAwal}
        onChange={setTanggalAwal}
      />
      <DatePicker
        showClearButton
        key={`tanggalAkhir-${tanggalAkhir}`}
        disabled={!tanggalAwal}
        label="Tanggal Akhir"
        placeholder="Tanggal Akhir"
        value={tanggalAkhir}
        minDate={tanggalAwal}
        onChange={setTanggalAkhir}
      />

      <DefaultSelect
        key={`type-${type}`}
        label="Tipe"
        options={typeOptions ?? []}
        placeholder="Pilih Tipe"
        onSelect={setType}
        value={type || ''}
      />
      <DefaultSelect
        key={`status-${status}`}
        label="Status"
        options={statusOptions ?? []}
        placeholder="Pilih Status"
        onSelect={setStatus}
        value={status || ''}
      />

      <div className="flex mt-2 justify-between">
        <Menu.Item className="w-fit h-fit p-0 cursor-pointer">
          <Button
            className="cursor-pointer"
            variant="outline"
            color="secondary"
            onClick={() => {
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
              disabled={disableButton}
              className="cursor-pointer"
              onClick={() => {
                onApply({ type, tanggalAwal, tanggalAkhir, statusFilter: status });
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

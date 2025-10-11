import DatePicker from '@/components/default-date-picker';
import DefaultSelect from '@/components/default-select';
import { useQueryDantel } from '@/hooks/dantel';
import { useQueryDokter } from '@/hooks/dokter';
import type { IDantelResponse } from '@/interface/dantel/response';
import type { IDokterResponse } from '@/interface/dokter/response';
import { Button, Menu } from '@material-tailwind/react';
import { useEffect, useMemo, useState } from 'react';

interface IFilterProps {
  onReset: () => void;
  filter: {
    dokter: string | null;
    dantel: string | null;
    tanggalAwal: Date | null;
    tanggalAkhir: Date | null;
    statusFilter: string | null;
  };
  onApply: ({
    dokter,
    dantel,
    tanggalAwal,
    tanggalAkhir,
    statusFilter,
  }: {
    dokter: string | null;
    dantel: string | null;
    tanggalAwal: Date | null;
    tanggalAkhir: Date | null;
    statusFilter: string | null;
  }) => void;
}

const Filter = ({ onReset, onApply, filter }: IFilterProps) => {
  const [tanggalAwal, setTanggalAwal] = useState<Date | null>(null);
  const [tanggalAkhir, setTanggalAkhir] = useState<Date | null>(null);
  const [dokter, setDokter] = useState<string | null>(null);
  const [dantel, setDantel] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const { data: dokterData } = useQueryDokter({
    limit: 1000,
    page: 1,
  });
  const { data: dantelData } = useQueryDantel({
    limit: 1000,
    page: 1,
  });

  const disableButton = useMemo(() => {
    if (tanggalAwal) {
      return !tanggalAkhir || tanggalAkhir < tanggalAwal;
    }
    return false;
  }, [tanggalAwal, tanggalAkhir]);

  const docterOptions = useMemo(() => {
    let options = [
      {
        label: 'Semua',
        value: '',
      },
    ];
    options = options.concat(
      dokterData?.metadata?.data?.map((item: IDokterResponse) => ({
        label: item.name,
        value: item.id.toString(),
      })) ?? []
    );
    return options;
  }, [dokterData]);

  const dantelOptions = useMemo(() => {
    let options = [
      {
        label: 'Semua',
        value: '',
      },
    ];
    options = options.concat(
      dantelData?.metadata?.data?.map((item: IDantelResponse) => ({
        label: item.name,
        value: item.id.toString(),
      })) ?? []
    );
    return options;
  }, [dantelData]);

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
        value: 'gagal',
      },
      {
        label: 'Sukses',
        value: 'sukses',
      },
    ];
  }, []);

  // Initialize state with filter values
  useEffect(() => {
    setDokter(filter?.dokter || null);
    setDantel(filter?.dantel || null);
    setTanggalAwal(filter?.tanggalAwal ? new Date(filter?.tanggalAwal) : null);
    setTanggalAkhir(filter?.tanggalAkhir ? new Date(filter?.tanggalAkhir) : null);
    setStatus(filter?.statusFilter || null);
  }, [filter]);

  // Reset state when component mounts or filter changes
  useEffect(() => {
    if (filter) {
      setDokter(filter.dokter);
      setDantel(filter.dantel);
      setTanggalAwal(filter.tanggalAwal);
      setTanggalAkhir(filter.tanggalAkhir);
      setStatus(filter.statusFilter);
    }
  }, [filter?.dokter, filter?.dantel, filter?.tanggalAwal, filter?.tanggalAkhir]);
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
        key={`dokter-${dokter}`}
        label="Dokter"
        options={docterOptions ?? []}
        placeholder="Pilih Dokter"
        onSelect={setDokter}
        value={dokter || ''}
      />
      <DefaultSelect
        key={`dantel-${dantel}`}
        label="Dantel"
        options={dantelOptions ?? []}
        placeholder="Pilih Dantel"
        onSelect={setDantel}
        value={dantel || ''}
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
                onApply({ dokter, dantel, tanggalAwal, tanggalAkhir, statusFilter: status });
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

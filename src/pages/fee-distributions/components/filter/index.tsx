import { Button, Menu } from '@material-tailwind/react';
import { useQueryPembagianOtomatis } from '@/hooks/pembagian-otomatis';
import { useEffect, useMemo, useState } from 'react';
import type { IPembagianOtomatisResponse } from '@/interface/pembagian-otomatis/response';
import DefaultSelect from '@/components/default-select';
import { useQueryDantel } from '@/hooks/dantel';
import { useQueryDokter } from '@/hooks/dokter';
import type { IDokterResponse } from '@/interface/dokter/response';
import type { IDantelResponse } from '@/interface/dantel/response';
import DatePicker from '@/components/default-date-picker';

interface IFilterProps {
  onReset: () => void;
  filter: {
    additionalFee: string | null;
    dokter: string | null;
    dantel: string | null;
    start_date: Date | null;
    end_date: Date | null;
  };
  onApply: ({
    additionalFee,
    dokter,
    dantel,
    start_date,
    end_date,
  }: {
    additionalFee: string;
    dokter: string | null;
    dantel: string | null;
    start_date: Date | null;
    end_date: Date | null;
  }) => void;
}

const Filter = ({ onReset, onApply, filter }: IFilterProps) => {
  const [tanggalAwal, setTanggalAwal] = useState<Date | null>(null);
  const [tanggalAkhir, setTanggalAkhir] = useState<Date | null>(null);
  const [additionalFee, setAdditionalFee] = useState<string | null>(null);
  const [dokter, setDokter] = useState<string | null>(null);
  const [dantel, setDantel] = useState<string | null>(null);
  const { data: additionalFeeData } = useQueryPembagianOtomatis({
    limit: 1000,
    page: 1,
  });
  const { data: dataDokter } = useQueryDokter({
    limit: 1000,
    page: 1,
  });
  const { data: dataDantel } = useQueryDantel({
    limit: 1000,
    page: 1,
  });

  const disableButton = useMemo(() => {
    if (tanggalAwal) {
      return !tanggalAkhir || tanggalAkhir < tanggalAwal;
    }
    return false;
  }, [tanggalAwal, tanggalAkhir]);

  const dokterOptions = useMemo(() => {
    let options = [
      {
        label: 'Semua',
        value: '',
      },
    ];
    options = options.concat(
      dataDokter?.metadata?.data?.map((item: IDokterResponse) => ({
        label: item.name,
        value: item.id.toString(),
      })) ?? []
    );
    return options;
  }, [dataDokter]);

  const dantelOptions = useMemo(() => {
    let options = [
      {
        label: 'Semua',
        value: '',
      },
    ];
    options = options.concat(
      dataDantel?.metadata?.data?.map((item: IDantelResponse) => ({
        label: item.name,
        value: item.id.toString(),
      })) ?? []
    );
    return options;
  }, [dataDantel]);

  const additionalFeeOptions = useMemo(() => {
    let options = [
      {
        label: 'Semua',
        value: '',
      },
    ];
    options = options.concat(
      additionalFeeData?.metadata?.data?.map((item: IPembagianOtomatisResponse) => ({
        label: item.name,
        value: item.name.replaceAll(' ', '-').replaceAll(',', '').replaceAll('.', '').toLowerCase(),
      })) ?? []
    );
    return options;
  }, [additionalFeeData]);
  useEffect(() => {
    setAdditionalFee(filter.additionalFee);
    setDokter(filter.dokter);
    setDantel(filter.dantel);
    setTanggalAwal(filter.start_date);
    setTanggalAkhir(filter.end_date);
  }, [filter]);

  useEffect(() => {
    setAdditionalFee(filter.additionalFee);
    setDokter(filter.dokter);
    setDantel(filter.dantel);
    setTanggalAwal(filter.start_date);
    setTanggalAkhir(filter.end_date);
  }, [filter.additionalFee, filter.dokter, filter.dantel, filter.start_date, filter.end_date]);
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
        key={`additionalFee-${additionalFee}`}
        placeholder="Pilih Pembagian Otomatis"
        value={additionalFee || ''}
        label="Pembagian Otomatis"
        options={additionalFeeOptions}
        onSelect={value => {
          setAdditionalFee(value);
        }}
      />
      {additionalFee === 'dokter' && (
        <DefaultSelect
          key={`dokter-${dokter}`}
          placeholder="Pilih Dokter"
          value={dokter || ''}
          label="Dokter"
          options={dokterOptions ?? []}
          onSelect={value => {
            setDokter(value);
          }}
        />
      )}
      {additionalFee === 'dental' && (
        <DefaultSelect
          key={`dental-${dantel}`}
          placeholder="Pilih Dental"
          value={dantel || ''}
          label="Dental"
          options={dantelOptions ?? []}
          onSelect={value => {
            setDantel(value);
          }}
        />
      )}
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
              onClick={() =>
                onApply({
                  additionalFee: additionalFee || '',
                  dokter: additionalFee === 'dokter' ? dokter : null,
                  dantel: additionalFee === 'dental' ? dantel : null,
                  start_date: tanggalAwal,
                  end_date: tanggalAkhir,
                })
              }
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

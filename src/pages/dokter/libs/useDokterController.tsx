import type { IDokterRequestParams } from '@/interface/dokter/request';
import { useMemo, useState } from 'react';
import { useQueryDokter } from '@/hooks/dokter';
import { IconButton } from '@material-tailwind/react';
import { EditPencil, Trash } from 'iconoir-react';
import type { IDokterResponse } from '@/interface/dokter/response';
import type { IColumn } from '@/components/default-table';

const useDokterController = () => {
  const [params, setParams] = useState<IDokterRequestParams>({
    per_page: 10,
    page: 1,
    search: '',
  });
  const { data, isLoading, error } = useQueryDokter(params);

  const columns: IColumn<IDokterResponse>[] = useMemo(
    () => [
      {
        key: 'name',
        label: 'Nama',
      },
      {
        key: 'action',
        label: 'Aksi',
        width: 150,
        minWidth: 150,
        maxWidth: 150,
        action: ({}) => {
          return (
            <div className="flex gap-2">
              <IconButton onClick={() => {}} className="cursor-pointer" size="sm" color="warning">
                <EditPencil />
              </IconButton>
              <IconButton onClick={() => {}} className="cursor-pointer" size="sm" color="error">
                <Trash />
              </IconButton>
            </div>
          );
        },
      },
    ],
    []
  );
  return {
    data,
    isLoading,
    error,
    params,
    setParams,
    columns,
  };
};

export default useDokterController;

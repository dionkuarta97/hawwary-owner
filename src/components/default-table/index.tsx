import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { IconButton, Input, Select, Menu } from '@material-tailwind/react';
import { Button } from '@material-tailwind/react';
import { NavArrowLeft, NavArrowRight, NavArrowDown, NavArrowUp, Search } from 'iconoir-react';
import { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';

export interface IColumn<T> {
  key: keyof T | string;
  label: string;
  width?: number;
  render?: ({ value, item, index }: { value: any; item: T; index: number }) => React.ReactNode;
  children?: React.ReactNode;
  action?: ({ value, item, index }: { value: any; item: T; index: number }) => React.ReactNode;
}

interface IDefaultTableProps<T> {
  data: T[];
  columns: IColumn<T>[];
  page: number;
  per_page: number;
  total_page: number;
  onPageChange: (newPage: number) => void;
  onPerPageChange?: (newPerPage: number) => void;
  className?: string;
  search?: string;
  onSearchChange?: (newSearch: string) => void;
  isLoading?: boolean;
  defaultShowDataMobile?: number;
  filter?: React.ReactNode;
}
const DefaultTable = <T,>({
  data,
  columns,
  page,
  per_page,
  total_page,
  onPageChange,
  onPerPageChange,
  className,
  search,
  onSearchChange,
  isLoading = false,
  defaultShowDataMobile = 2,
  filter,
}: IDefaultTableProps<T>) => {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

  const visibleColumns = (index: number) =>
    expandedCards.has(index) ? columns : columns.slice(0, defaultShowDataMobile);

  // Detect mobile screen size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <div
      className={cn(
        'min-h-[calc(100vh-110px)] flex p-4 flex-col gap-4 justify-between bg-white rounded-md overflow-hidden',
        className
      )}
    >
      <div className="flex flex-col lg:flex-row w-full gap-4 lg:justify-between lg:items-center">
        <div className="flex w-fit">
          <Select value={per_page.toString() + ' / page'}>
            <Select.Trigger />
            <Select.List>
              <Select.Option onClick={() => onPerPageChange?.(10)} value="10 / page">
                10 / page
              </Select.Option>
              <Select.Option onClick={() => onPerPageChange?.(20)} value="20 / page">
                20 / page
              </Select.Option>
              <Select.Option onClick={() => onPerPageChange?.(50)} value="50 / page">
                50 / page
              </Select.Option>
              <Select.Option onClick={() => onPerPageChange?.(100)} value="100 / page">
                100 / page
              </Select.Option>
            </Select.List>
          </Select>
        </div>

        <div className="flex w-full lg:w-fit gap-2">
          <div className="flex w-full lg:w-fit">
            <Input
              className="w-full lg:w-[300px]"
              placeholder="Search"
              value={search || ''}
              onChange={e => onSearchChange?.(e.target.value)}
            >
              <Input.Icon>
                <Search className="h-full w-full" />
              </Input.Icon>
            </Input>
          </div>
          {filter && (
            <Menu placement="bottom-end">
              <Menu.Trigger className="cursor-pointer" color="secondary" as={Button}>
                Filter
              </Menu.Trigger>
              <Menu.Content className="w-[300px] p-[12px]">{filter}</Menu.Content>
            </Menu>
          )}
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden h-full overflow-x-auto lg:block flex-1 min-w-0">
        <Table hoverable className="min-w-max w-full">
          <TableHead>
            <TableRow>
              <TableHeadCell className="bg-gray-200 w-1.5">No</TableHeadCell>
              {columns.map(column => (
                <TableHeadCell
                  key={String(column.key)}
                  className="bg-gray-200"
                  style={
                    column.width
                      ? {
                          width: `${column.width}px`,
                          minWidth: `${column.width}px`,
                          maxWidth: `${column.width}px`,
                        }
                      : {}
                  }
                >
                  {column.label}
                </TableHeadCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="divide-y divide-gray-200">
            {isLoading
              ? // Skeleton Loading for Desktop
                Array.from({ length: per_page }, (_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                    </TableCell>
                    {columns.map(column => (
                      <TableCell
                        key={String(column.key)}
                        style={
                          column.width
                            ? {
                                width: `${column.width}px`,
                                minWidth: `${column.width}px`,
                                maxWidth: `${column.width}px`,
                              }
                            : {}
                        }
                      >
                        <div
                          className={cn(
                            'h-4 bg-gray-200 rounded animate-pulse',
                            column.key === 'action' ? 'w-8' : 'w-24'
                          )}
                        ></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1 + (page - 1) * per_page}</TableCell>
                    {columns.map(column => (
                      <TableCell
                        key={String(column.key)}
                        className="overflow-hidden text-ellipsis whitespace-nowrap"
                        style={
                          column.width
                            ? {
                                width: `${column.width}px`,
                                minWidth: `${column.width}px`,
                                maxWidth: `${column.width}px`,
                              }
                            : { minWidth: '150px' }
                        }
                      >
                        {column.children ||
                          (column.action
                            ? column.action({ value: (item as any)[column.key], item, index })
                            : column.render
                            ? column.render({ value: (item as any)[column.key], item, index })
                            : String((item as any)[column.key] || ''))}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Accordion */}
      <div className="lg:hidden space-y-3">
        {isLoading
          ? // Skeleton Loading for Mobile
            Array.from({ length: per_page }, (_, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                {/* Card Header with Number */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                  <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                  {columns.length > defaultShowDataMobile && (
                    <div className="w-3 h-3 bg-gray-200 rounded animate-pulse"></div>
                  )}
                </div>

                <div className="space-y-2">
                  {columns
                    .filter(column => column.key !== 'action')
                    .slice(0, defaultShowDataMobile)
                    .map(column => (
                      <div key={String(column.key)} className="flex justify-between items-start">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                      </div>
                    ))}
                </div>
              </div>
            ))
          : data.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  const newExpandedCards = new Set(expandedCards);
                  if (expandedCards.has(index)) {
                    newExpandedCards.delete(index);
                  } else {
                    newExpandedCards.add(index);
                  }
                  setExpandedCards(newExpandedCards);
                }}
              >
                {/* Card Header with Number */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">NO.</span>
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                      {index + 1 + (page - 1) * per_page}
                    </div>
                  </div>
                  {columns.length > defaultShowDataMobile && (
                    <div className="text-xs text-gray-500">
                      {expandedCards.has(index) ? (
                        <NavArrowUp className="h-3 w-3" />
                      ) : (
                        <NavArrowDown className="h-3 w-3" />
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {visibleColumns(index)
                    .filter(column => column.key !== 'action')
                    .map(column => (
                      <div key={String(column.key)} className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-600 min-w-[80px]">
                          {column.label}:
                        </span>
                        <div className="text-sm overflow-hidden text-ellipsis whitespace-nowrap text-gray-900 text-right flex-1 ml-2">
                          {column.children ||
                            (column.render
                              ? column.render({ value: (item as any)[column.key], item, index })
                              : String((item as any)[column.key] || ''))}
                        </div>
                      </div>
                    ))}
                </div>

                {/* Action Column - Bottom Right (Only when expanded) */}
                {columns.some(col => col.key === 'action') && expandedCards.has(index) && (
                  <div className="flex justify-end mt-3 pt-2 border-t border-gray-100">
                    {columns
                      .filter(col => col.key === 'action')
                      .map(column => (
                        <div key={String(column.key)}>
                          {column.children ||
                            (column.action
                              ? column.action({ value: (item as any)[column.key], item, index })
                              : column.render
                              ? column.render({ value: (item as any)[column.key], item, index })
                              : null)}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
      </div>
      <div className="flex items-center justify-center py-2 gap-1 flex-wrap">
        <Button
          className="cursor-pointer"
          variant="outline"
          disabled={page === 1}
          onClick={() => onPageChange(1)}
          size="sm"
        >
          First
        </Button>
        <Button
          className="cursor-pointer"
          variant="outline"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          <NavArrowLeft className="mr-1.5 h-4 w-4 stroke-2" />
          Previous
        </Button>

        {(() => {
          const maxVisiblePages = isMobile ? 5 : 10; // 5 untuk mobile, 10 untuk desktop
          let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
          let endPage = Math.min(total_page, startPage + maxVisiblePages - 1);

          // Adjust start page if we're near the end
          if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
          }

          return Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const pageNumber = startPage + i;
            return (
              <IconButton
                className="cursor-pointer"
                key={pageNumber}
                variant={page === pageNumber ? 'solid' : 'outline'}
                size="sm"
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </IconButton>
            );
          });
        })()}

        <Button
          className="cursor-pointer"
          variant="outline"
          disabled={page === total_page}
          size="sm"
          onClick={() => onPageChange(page + 1)}
        >
          Next
          <NavArrowRight className="ml-1.5 h-4 w-4 stroke-2" />
        </Button>
        <Button
          className="cursor-pointer"
          variant="outline"
          disabled={page === total_page}
          onClick={() => onPageChange(total_page)}
          size="sm"
        >
          Last
        </Button>
      </div>
    </div>
  );
};

export default DefaultTable;

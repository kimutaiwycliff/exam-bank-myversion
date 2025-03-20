'use client';

import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { DataTableToolbar } from './data-table-toolbar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTablePagination } from './data-table-pagination';
import { useQuery } from '@tanstack/react-query';
import SpinningLoader from '@/components/loaders/SpinningLoader';

export function DataTable({
  columns,
  fetchFunction,
  queryKey,
  rest,
  searchColumn,
  searchLabel,
  filters,
}) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [queryKey, pagination.pageIndex, pagination.pageSize], // Cache key includes userType to refetch when it changes
    queryFn: async () => {
      const results = await fetchFunction({
        ...rest,
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      });
      return results;
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  const table = useReactTable({
    data: data?.results || data?.details || [],
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    enableRowSelection: true,
    manualPagination: true,
    pageCount: Math.ceil((data?.count || 0) / pagination.pageSize),
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="">
      {isLoading ? (
        <div className="mx-auto">
          <SpinningLoader />
        </div>
      ) : isError ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <div className="space-y-4">
          <DataTableToolbar
            table={table}
            searchColumn={`${searchColumn}`}
            searchLabel={`${searchLabel}`}
            filters={filters}
          />
          <div className="rounded-md border ">
            <Table>
              <TableHeader className="bg-slate-600 ">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          colSpan={header.colSpan}
                          className="text-white"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <DataTablePagination table={table} />
        </div>
      )}
    </div>
  );
}

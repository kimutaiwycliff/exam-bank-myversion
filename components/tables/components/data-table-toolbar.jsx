"use client"

import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { DataTableViewOptions } from "./data-table-view-options";

export function DataTableToolbar({
  table,
  searchLabel,
  searchColumn,
  filters,
}) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Filter ${searchLabel}...`}
          value={(table.getColumn(`${searchColumn}`)?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn(`${searchColumn}`)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {filters?.map((filter) => {
          const column = table.getColumn(filter.column);
          return (
            column && (
              <DataTableFacetedFilter
                key={filter.column}
                column={column}
                title={filter.title}
                options={filter.options}
              />
            )
          );
        })}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}

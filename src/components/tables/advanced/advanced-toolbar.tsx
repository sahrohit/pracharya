"use client";

import * as React from "react";
import type { Table } from "@tanstack/react-table";

import { LuPlus } from "react-icons/lu";
import { RxCaretSort } from "react-icons/rx";
import type {
	DataTableFilterableColumn,
	DataTableFilterOption,
	DataTableSearchableColumn,
} from "@/types/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdvancedFilter from "@/components/tables/advanced/advanced-filter";
import ViewOptions from "@/components/tables/view-options";

import AdvancedFilterItem from "./advanced-filter-item";
import { MultiFilter } from "./multi-filter";

interface AdvancedToolbarProps<TData> {
	dataTable: Table<TData>;
	searchableColumns?: DataTableSearchableColumn<TData>[];
	filterableColumns?: DataTableFilterableColumn<TData>[];
}

const AdvancedToolbar = <TData,>({
	dataTable,
	filterableColumns = [],
	searchableColumns = [],
}: AdvancedToolbarProps<TData>) => {
	const [selectedOptions, setSelectedOptions] = React.useState<
		DataTableFilterOption<TData>[]
	>([]);
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		if (selectedOptions.length > 0) {
			setOpen(true);
		}
	}, [selectedOptions]);

	const options: DataTableFilterOption<TData>[] = React.useMemo(() => {
		const searchableOptions = searchableColumns.map((column) => ({
			id: crypto.randomUUID(),
			label: String(column.id),
			value: column.id,
			items: [],
		}));
		const filterableOptions = filterableColumns.map((column) => ({
			id: crypto.randomUUID(),
			label: column.title,
			value: column.id,
			items: column.options,
		}));

		return [...searchableOptions, ...filterableOptions];
	}, [filterableColumns, searchableColumns]);

	return (
		<div className="w-full space-y-2.5 overflow-auto p-1">
			<div className="flex items-center justify-between space-x-2">
				<div className="flex flex-1 items-center space-x-2">
					{searchableColumns.length > 0 &&
						searchableColumns.map(
							(column) =>
								dataTable.getColumn(column.id ? String(column.id) : "") && (
									<Input
										key={String(column.id)}
										placeholder={`Filter ${column.title}...`}
										value={
											(dataTable
												.getColumn(String(column.id))
												?.getFilterValue() as string) ?? ""
										}
										onChange={(event) =>
											dataTable
												.getColumn(String(column.id))
												?.setFilterValue(event.target.value)
										}
										className="h-8 w-[150px] lg:w-[250px]"
									/>
								)
						)}
				</div>
				<div className="flex items-center space-x-2">
					{selectedOptions.length > 0 ? (
						<Button
							variant="outline"
							size="sm"
							onClick={() => setOpen((prev) => !prev)}
						>
							Filter
							<RxCaretSort
								className="ml-2 h-4 w-4 opacity-50"
								aria-hidden="true"
							/>
						</Button>
					) : (
						<AdvancedFilter
							options={options.filter(
								(option) =>
									!selectedOptions.some(
										(selectedOption) => selectedOption.value === option.value
									)
							)}
							selectedOptions={selectedOptions}
							setSelectedOptions={setSelectedOptions}
						/>
					)}
					<ViewOptions table={dataTable} />
				</div>
			</div>
			{open ? (
				<div className="flex items-center space-x-2">
					{selectedOptions.some((option) => option.isMulti) ? (
						<MultiFilter
							table={dataTable}
							allOptions={options}
							options={selectedOptions.filter((option) => option.isMulti)}
							setSelectedOptions={setSelectedOptions}
						/>
					) : null}
					{selectedOptions
						.filter((option) => !option.isMulti)
						.map((selectedOption) => (
							<AdvancedFilterItem
								key={String(selectedOption.value)}
								table={dataTable}
								selectedOption={selectedOption}
								setSelectedOptions={setSelectedOptions}
							/>
						))}
					<AdvancedFilter
						options={options}
						selectedOptions={selectedOptions}
						setSelectedOptions={setSelectedOptions}
					>
						<Button
							variant="outline"
							size="sm"
							role="combobox"
							className="rounded-full"
						>
							<LuPlus className="mr-2 h-4 w-4 opacity-50" aria-hidden="true" />
							Add filter
						</Button>
					</AdvancedFilter>
				</div>
			) : null}
		</div>
	);
};

export default AdvancedToolbar;

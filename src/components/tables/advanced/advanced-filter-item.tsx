import {
	useState,
	useCallback,
	useEffect,
	type Dispatch,
	type SetStateAction,
} from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { LuTrash } from "react-icons/lu";
import type { Table } from "@tanstack/react-table";
import type { DataTableFilterOption } from "@/types/table";

import { cn } from "@/lib/utils";
import useDebounce from "@/components/hooks/use-debounce";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import FacetedFilter from "../faceted-filter";

interface DataTableAdvancedFilterItemProps<TData> {
	table: Table<TData>;
	selectedOption: DataTableFilterOption<TData>;
	setSelectedOptions: Dispatch<SetStateAction<DataTableFilterOption<TData>[]>>;
}

const AdvancedFilterItem = <TData,>({
	table,
	selectedOption,
	setSelectedOptions,
}: DataTableAdvancedFilterItemProps<TData>) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [value, setValue] = useState("");
	const debounceValue = useDebounce(value, 500);
	const [open, setOpen] = useState(true);

	const selectedValues =
		selectedOption.items.length > 0
			? Array.from(
					new Set(
						table
							.getColumn(String(selectedOption.value))
							?.getFilterValue() as string[]
					)
				)
			: [];

	const filterVarieties =
		selectedOption.items.length > 0
			? ["is", "is not"]
			: ["contains", "does not contain", "is", "is not"];

	const [filterVariety, setFilterVariety] = useState(filterVarieties[0]);

	// Create query string
	const createQueryString = useCallback(
		(params: Record<string, string | number | null>) => {
			const newSearchParams = new URLSearchParams(searchParams?.toString());

			// TODO: Need to convert this into iterators
			// eslint-disable-next-line no-restricted-syntax
			for (const [key, value] of Object.entries(params)) {
				if (value === null) {
					newSearchParams.delete(key);
				} else {
					newSearchParams.set(key, String(value));
				}
			}

			return newSearchParams.toString();
		},
		[searchParams]
	);

	useEffect(() => {
		if (debounceValue.length > 0) {
			router.push(
				`${pathname}?${createQueryString({
					[selectedOption.value]: `${debounceValue}${
						debounceValue.length > 0 ? `.${filterVariety}` : ""
					}`,
				})}`,
				{
					scroll: false,
				}
			);
		}

		if (debounceValue.length === 0) {
			router.push(
				`${pathname}?${createQueryString({
					[selectedOption.value]: null,
				})}`,
				{
					scroll: false,
				}
			);
		}
	}, [debounceValue, filterVariety, selectedOption.value]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className={cn(
						"h-7 truncate rounded-full",
						(selectedValues.length > 0 || value.length > 0) && "bg-muted/50"
					)}
				>
					{value.length > 0 || selectedValues.length > 0 ? (
						<>
							<span className="font-medium capitalize">
								{selectedOption.label}:
							</span>
							{selectedValues.length > 0 ? (
								<span className="ml-1">
									{selectedValues.length > 2
										? `${selectedValues.length} selected`
										: selectedValues.join(", ")}
								</span>
							) : (
								<span className="ml-1">{value}</span>
							)}
						</>
					) : (
						<span className="capitalize">{selectedOption.label}</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-60 space-y-1 text-xs" align="start">
				<div className="flex items-center space-x-1">
					<div className="flex flex-1 items-center space-x-1">
						<div className="capitalize">{selectedOption.label}</div>
						<Select onValueChange={(value) => setFilterVariety(value)}>
							<SelectTrigger className="h-auto w-fit truncate border-none px-2 py-0.5 hover:bg-muted/50">
								<SelectValue placeholder={filterVarieties[0]} />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{filterVarieties.map((variety) => (
										<SelectItem key={variety} value={variety}>
											{variety}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<Button
						aria-label="Remove filter"
						variant="ghost"
						size="icon"
						className="h-8 w-8"
						onClick={() => {
							router.push(
								`${pathname}?${createQueryString({
									[selectedOption.value]: null,
								})}`,
								{
									scroll: false,
								}
							);
							setSelectedOptions((prev) =>
								prev.filter((item) => item.value !== selectedOption.value)
							);
						}}
					>
						<LuTrash className="h-4 w-4" aria-hidden="true" />
					</Button>
				</div>
				{selectedOption.items.length > 0 ? (
					table.getColumn(
						selectedOption.value ? String(selectedOption.value) : ""
					) && (
						<FacetedFilter
							key={String(selectedOption.value)}
							column={table.getColumn(
								selectedOption.value ? String(selectedOption.value) : ""
							)}
							title={selectedOption.label}
							options={selectedOption.items}
							variant="command"
						/>
					)
				) : (
					<Input
						placeholder="Type here..."
						className="h-8"
						value={value}
						onChange={(event) => setValue(event.target.value)}
						autoFocus
					/>
				)}
			</PopoverContent>
		</Popover>
	);
};

export default AdvancedFilterItem;

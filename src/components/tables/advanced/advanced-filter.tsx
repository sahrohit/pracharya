"use client";

import * as React from "react";
import { LuChevronDown, LuPlus, LuText } from "react-icons/lu";
import { RxCaretSort } from "react-icons/rx";
import type { DataTableFilterOption } from "@/types/table";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandSeparator,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface DataTableAdvancedFilterProps<TData> {
	options: DataTableFilterOption<TData>[];
	selectedOptions: DataTableFilterOption<TData>[];
	setSelectedOptions: React.Dispatch<
		React.SetStateAction<DataTableFilterOption<TData>[]>
	>;
	children?: React.ReactNode;
}

const AdvancedFilter = <TData,>({
	options,
	selectedOptions,
	setSelectedOptions,
	children,
}: DataTableAdvancedFilterProps<TData>) => {
	const [value, setValue] = React.useState("");
	const [open, setOpen] = React.useState(false);
	const [selectedOption, setSelectedOption] = React.useState<
		DataTableFilterOption<TData> | undefined
	>(options[0]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				{children ?? (
					<Button
						variant="outline"
						size="sm"
						role="combobox"
						className="capitalize"
					>
						Filter
						<RxCaretSort
							className="ml-2 h-4 w-4 shrink-0 opacity-50"
							aria-hidden="true"
						/>
					</Button>
				)}
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0" align="end">
				<Command>
					<CommandInput placeholder="Filter by..." />
					<CommandEmpty>No item found.</CommandEmpty>
					<CommandGroup>
						{options.map((option) => (
							<CommandItem
								key={String(option.value)}
								className="capitalize"
								value={String(option.value)}
								onSelect={(currentValue) => {
									setValue(currentValue === value ? "" : currentValue);
									setOpen(false);
									setSelectedOption(option);
									setSelectedOptions((prev) => {
										if (currentValue === value) {
											return prev.filter((item) => item.value !== option.value);
										}
										return [...prev, option];
									});
								}}
							>
								{option.items.length > 0 ? (
									<LuChevronDown className="mr-2 h-4 w-4" aria-hidden="true" />
								) : (
									<LuText className="mr-2 h-4 w-4" aria-hidden="true" />
								)}
								{option.label}
							</CommandItem>
						))}
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup>
						<CommandItem
							onSelect={() => {
								setOpen(false);
								setSelectedOptions([
									...selectedOptions,
									{
										id: crypto.randomUUID(),
										label: String(selectedOption?.label),
										value: String(selectedOption?.value),
										items: selectedOption?.items ?? [],
										isMulti: true,
									},
								]);
							}}
						>
							<LuPlus className="mr-2 h-4 w-4" aria-hidden="true" />
							Advanced filter
						</CommandItem>
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default AdvancedFilter;

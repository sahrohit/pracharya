import {
	type Control,
	useFieldArray,
	type UseFormSetValue,
} from "react-hook-form";
import { type z } from "zod";
import { LuCheck, LuChevronDown, LuTrash } from "react-icons/lu";
import { type PatternFormSchema } from "@/components/schema/exam";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { type SelectSubChapterWithChapter } from "@/server/db/types";

export type PatternFormValues = z.infer<typeof PatternFormSchema>;

const SubChapterSelector = ({
	nestIndex,
	control,
	setValue,
	subChapters,
}: {
	nestIndex: number;
	control: Control<PatternFormValues>;
	setValue: UseFormSetValue<PatternFormValues>;
	subChapters?: SelectSubChapterWithChapter[];
}) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name: `patterns.${nestIndex}.subChapters`,
	});

	return (
		<div className="flex flex-row flex-wrap gap-2">
			{fields.map((field, index) => (
				<FormField
					key={`question-${nestIndex}-subChapter-${index + 1}-${field.id}`}
					control={control}
					name={`patterns.${nestIndex}.subChapters.${index}.subChapterId`}
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											role="combobox"
											className={cn(
												" flex flex-row justify-between gap-1",
												!field.value && "text-muted-foreground"
											)}
										>
											{field.value
												? subChapters?.find(
														(subChapter) => subChapter.id === field.value
													)?.name
												: "Select Sub Chapters"}
											<LuChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											<Button
												onClick={() => remove(index)}
												variant="destructive"
												size="sm"
												className="-mr-2 h-8 w-8 p-0"
											>
												<LuTrash />
											</Button>
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="p-0">
									<Command>
										<CommandInput placeholder="Search Sub Chapters..." />
										<CommandEmpty>No Sub Chapters found.</CommandEmpty>
										<CommandGroup>
											{subChapters?.map((subChapter) => (
												<CommandItem
													value={subChapter.id}
													key={subChapter.id}
													onSelect={() => {
														setValue(
															`patterns.${nestIndex}.subChapters.${index}.subChapterId`,
															subChapter.id
														);
													}}
												>
													<LuCheck
														className={cn(
															"mr-2 h-4 w-4",
															subChapter.id === field.value
																? "opacity-100"
																: "opacity-0"
														)}
													/>
													{subChapter.name}
												</CommandItem>
											))}
										</CommandGroup>
									</Command>
								</PopoverContent>
							</Popover>
						</FormItem>
					)}
				/>
			))}

			<Button
				variant="outline"
				onClick={() => {
					append({ subChapterId: "" });
				}}
			>
				Add Sub Chapter
			</Button>
		</div>
	);
};

export default SubChapterSelector;

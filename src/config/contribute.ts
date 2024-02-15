import { type IconType } from "@/components/icons";

export const TABSVALUES = ["notes", "mcq"] as const;

export const TABS: { label: string; value: Tab; icon: IconType }[] = [
	{
		label: "Add MCQ Question",
		value: "mcq",
		icon: "listcheck",
	},
	{
		label: "Add/Edit Notes",
		value: "notes",
		icon: "edit",
	},
];

export type Tab = (typeof TABSVALUES)[number];

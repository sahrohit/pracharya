import { type IconType } from "@/components/icons";

export const TABSVALUES = ["idea", "report", "notes", "mcq"] as const;

export const TABS: { label: string; value: Tab; icon: IconType }[] = [
	{
		label: "Report a Problem",
		value: "report",
		icon: "report",
	},
	{
		label: "Add/Edit Notes",
		value: "notes",
		icon: "edit",
	},
	{
		label: "Add MCQ Question",
		value: "mcq",
		icon: "listcheck",
	},
];

export type Tab = (typeof TABSVALUES)[number];

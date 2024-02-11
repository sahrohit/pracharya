import { type IconType } from "@/components/icons";

export const TABSVALUES = ["idea", "report", "notes", "mcq"] as const;

export const TABS: { label: string; value: Tab; icon: IconType }[] = [
	{
		label: "Report a Problem",
		value: "report",
		icon: "report" as IconType,
	},
	{
		label: "Add/Edit Notes",
		value: "notes",
		icon: "edit" as IconType,
	},
	{
		label: "Add MCQ Question",
		value: "mcq",
		icon: "listcheck" as IconType,
	},
];

export type Tab = (typeof TABSVALUES)[number];

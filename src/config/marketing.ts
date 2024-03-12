import { type NavItem } from "@/types";

export const NAV_ITEM: NavItem[] = [
	{
		title: "Study",
		href: "/notes",
	},
	{
		title: "Contribute",
		href: "/contribute",
	},
];

export const DASHBOARD_NAV_ITEM: NavItem[] = [
	{
		title: "Requests",
		href: "/dashboard",
		icon: "post",
	},
	{
		title: "Tests",
		href: "/tests",
		icon: "post",
	},
	{
		title: "Settings",
		href: "/dashboard/settings",
		icon: "settings",
	},
];

export const ADMIN_NAV_ITEM: NavItem[] = [
	{
		title: "Requests",
		href: "/admin",
		icon: "post",
	},
	{
		title: "Exam Patterns",
		href: "/admin/patterns",
		icon: "patterns",
	},
	{
		title: "Settings",
		href: "/admin/settings",
		icon: "settings",
	},
];

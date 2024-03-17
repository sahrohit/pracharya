import { type NavItem } from "@/types";

export const NAV_ITEM: NavItem[] = [
	{
		title: "Notes",
		href: "/notes",
	},
	{
		title: "Blogs",
		href: "/blog",
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
		href: "/dashboard/tests",
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

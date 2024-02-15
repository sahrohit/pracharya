import { type NavItem } from "@/types";

export const NAV_ITEM: NavItem[] = [
	{
		title: "Study",
		href: "/computer-engineering",
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
		title: "Billing",
		href: "/dashboard/billing",
		icon: "billing",
	},
	{
		title: "Settings",
		href: "/dashboard/settings",
		icon: "settings",
	},
];

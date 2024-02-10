/* eslint-disable import/prefer-default-export */

import { type NavItem } from "@/types";

export const NAV_ITEM: NavItem[] = [
	{
		title: "Study",
		href: "/computer-engineering",
	},
];

export const DASHBOARD_NAV_ITEM: NavItem[] = [
	{
		title: "Panel",
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

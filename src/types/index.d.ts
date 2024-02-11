import { type IconType } from "@/components/icons";

export type NavItem = {
	title: string;
	href: string;
	disabled?: boolean;
	icon?: IconType;
};

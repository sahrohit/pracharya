import { type Icon } from "@/components/icons";

export type NavItem = {
	title: string;
	href: string;
	disabled?: boolean;
	icon?: Icon;
};

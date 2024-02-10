import {
	LuArrowRight,
	LuCreditCard,
	LuFileText,
	LuSettings,
} from "react-icons/lu";

export const Icons = {
	billing: LuCreditCard,
	post: LuFileText,
	settings: LuSettings,
	arrowRight: LuArrowRight,
} as const;

export type Icon = keyof typeof Icons;

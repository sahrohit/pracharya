import {
	LuArrowRight,
	LuCreditCard,
	LuFileEdit,
	LuFileText,
	LuListChecks,
	LuSettings,
} from "react-icons/lu";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdReport } from "react-icons/md";

export const Icons = {
	billing: LuCreditCard,
	post: LuFileText,
	settings: LuSettings,
	arrowRight: LuArrowRight,
	bulb: HiOutlineLightBulb,
	report: MdReport,
	edit: LuFileEdit,
	listcheck: LuListChecks,
} as const;

export type IconType = keyof typeof Icons;

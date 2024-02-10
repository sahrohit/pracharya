/* eslint-disable jsx-a11y/anchor-is-valid */

import * as React from "react";
import Link from "next/link";
import { LuCommand } from "react-icons/lu";

import { type NavItem } from "@/types/index";
import siteConfig from "@/config/site";
import { cn } from "@/lib/utils";
import useLockBody from "@/components/hooks/use-lock-body";

interface MobileNavProps {
	items: NavItem[];
	children?: React.ReactNode;
}

const MobileNav = ({ items, children }: MobileNavProps) => {
	useLockBody();

	return (
		<div
			className={cn(
				"fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
			)}
		>
			<div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
				<Link href="/" className="flex items-center space-x-2">
					<LuCommand />
					<span className="font-bold">{siteConfig.name}</span>
				</Link>
				<nav className="grid grid-flow-row auto-rows-max text-sm">
					{items.map((item) => (
						<Link
							key={`nav-${item.title}`}
							href={item.disabled ? "#" : item.href}
							className={cn(
								"flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
								item.disabled && "cursor-not-allowed opacity-60"
							)}
						>
							{item.title}
						</Link>
					))}
				</nav>
				{children}
			</div>
		</div>
	);
};

export default MobileNav;

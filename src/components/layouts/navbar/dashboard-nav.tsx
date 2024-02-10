/* eslint-disable @typescript-eslint/no-unsafe-assignment */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type NavItem } from "@/types";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

interface DashboardNavProps {
	items: NavItem[];
}

const DashboardNav = ({ items }: DashboardNavProps) => {
	const path = usePathname();

	if (!items?.length) {
		return null;
	}

	return (
		<nav className="grid items-start gap-2">
			{items.map((item) => {
				const Icon = Icons[item.icon ?? "arrowRight"];
				return (
					item.href && (
						<Link
							key={`nav-${item.title}`}
							href={item.disabled ? "/" : item.href}
						>
							<span
								className={cn(
									"group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
									path === item.href ? "bg-accent" : "transparent",
									item.disabled && "cursor-not-allowed opacity-80"
								)}
							>
								<Icon className="mr-2 size-4" />
								<span>{item.title}</span>
							</span>
						</Link>
					)
				);
			})}
		</nav>
	);
};

export default DashboardNav;

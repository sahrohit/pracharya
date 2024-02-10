/* eslint-disable jsx-a11y/anchor-is-valid */

"use client";

import * as React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { LuCommand, LuX } from "react-icons/lu";

import { type NavItem } from "@/types/index";
import siteConfig from "@/config/site";
import { cn } from "@/lib/utils";
import MobileNav from "@/components/layouts/navbar/mobile-nav";
import Logo from "@/components/logo";

interface MainNavProps {
	items?: NavItem[];
	children?: React.ReactNode;
}

const MainNav = ({ items, children }: MainNavProps) => {
	const segment = useSelectedLayoutSegment();
	const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

	const toggleMobileMenu = () => {
		setShowMobileMenu(!showMobileMenu);
	};

	React.useEffect(() => {
		const closeMobileMenuOnClickOutside = (_event: MouseEvent) => {
			if (showMobileMenu) {
				setShowMobileMenu(false);
			}
		};

		document.addEventListener("click", closeMobileMenuOnClickOutside);

		return () => {
			document.removeEventListener("click", closeMobileMenuOnClickOutside);
		};
	}, [showMobileMenu]);

	return (
		<div className="flex gap-6 md:gap-10">
			<Link href="/" className="hidden items-center space-x-2 md:flex">
				<Logo />
				<span className="font-urban hidden text-xl font-bold sm:inline-block">
					{siteConfig.name}
				</span>
			</Link>
			{items?.length ? (
				<nav className="hidden gap-6 md:flex">
					{items?.map((item) => (
						<Link
							key={`nav-${item.title}`}
							href={item.disabled ? "#" : item.href}
							className={cn(
								"flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
								item.href.startsWith(`/${segment}`)
									? "text-foreground"
									: "text-foreground/60",
								item.disabled && "cursor-not-allowed opacity-80"
							)}
						>
							{item.title}
						</Link>
					))}
				</nav>
			) : null}
			<button
				type="button"
				className="flex items-center space-x-2 md:hidden"
				onClick={toggleMobileMenu}
			>
				{showMobileMenu ? <LuX /> : <LuCommand />}
				<span className="font-bold">Menu</span>
			</button>
			{showMobileMenu && items && (
				<MobileNav items={items}>{children}</MobileNav>
			)}
		</div>
	);
};

export default MainNav;

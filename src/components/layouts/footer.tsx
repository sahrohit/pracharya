import * as React from "react";
import Link from "next/link";
import { LuCommand } from "react-icons/lu";

import siteConfig from "@/config/site";
import { cn } from "@/lib/utils";
import ModeToggle from "@/components/layouts/mode-toggle";

import { buttonVariants } from "../ui/button";

const SiteFooter = ({
	className,
}: React.HTMLAttributes<HTMLElement> & {
	className?: string;
}) => (
	<footer className={cn(className)}>
		<div className="container flex flex-col items-center justify-between gap-4 py-10 md:my-4 md:flex-row md:py-0">
			<div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
				<LuCommand />
				<p className="text-center text-sm leading-loose md:text-left">
					© {new Date().getFullYear()} {siteConfig.name} All Rights Reserved.
				</p>
			</div>
			<div className="flex flex-row">
				<Link href="/" className={cn(buttonVariants({ variant: "link" }))}>
					Contact Us
				</Link>
				<Link
					href="/#pricing"
					className={cn(buttonVariants({ variant: "link" }))}
				>
					Pricing
				</Link>
			</div>
			<ModeToggle />
		</div>
	</footer>
);

export default SiteFooter;

import React from "react";
import { LuCommand } from "react-icons/lu";
import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => (
	<LuCommand className={cn("h-6 w-6", className)} />
);

export default Logo;

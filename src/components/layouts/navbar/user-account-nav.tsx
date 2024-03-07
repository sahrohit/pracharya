"use client";

import Link from "next/link";
import type { User } from "next-auth";
import { signOut } from "next-auth/react";
import { LuLayoutDashboard, LuLogOut, LuUser2 } from "react-icons/lu";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/shared/user-avatar";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
	user: Pick<User, "name" | "image" | "email">;
}

const UserAccountNav = ({ user }: UserAccountNavProps) => (
	<DropdownMenu>
		<DropdownMenuTrigger>
			<UserAvatar
				user={{ name: user?.name ?? null, image: user?.image ?? null }}
				className="size-8"
			/>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
			<div className="flex items-center justify-start gap-2 p-2">
				<div className="flex flex-col space-y-1 leading-none">
					{user?.name && <p className="font-medium">{user?.name}</p>}
					{user?.email && (
						<p className="w-[200px] truncate text-sm text-muted-foreground">
							{user?.email}
						</p>
					)}
				</div>
			</div>
			<DropdownMenuSeparator />
			<DropdownMenuItem asChild>
				<Link href="/dashboard" className="flex items-center space-x-2.5">
					<LuLayoutDashboard className="size-4" />
					<p className="text-sm">Dashboard</p>
				</Link>
			</DropdownMenuItem>
			<DropdownMenuItem asChild>
				<Link href="/admin" className="flex items-center space-x-2.5">
					<LuUser2 className="size-4" />
					<p className="text-sm">Admin</p>
				</Link>
			</DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem
				className="cursor-pointer"
				onSelect={async (event) => {
					event.preventDefault();
					await signOut({
						callbackUrl: `${window.location.origin}/`,
					});
				}}
			>
				<div className="flex items-center space-x-2.5">
					<LuLogOut className="size-4" />
					<p className="text-sm">Log out </p>
				</div>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
);

export default UserAccountNav;

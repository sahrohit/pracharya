/* eslint-disable no-console */

"use client";

import { toast } from "sonner";
import { useSession } from "next-auth/react";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AdminPage = () => {
	const session = useSession();

	const onApiRouteClick = () => {
		toast.promise(fetch("/api/admin"), {
			loading: "Loading...",
			success: "Allowed API Route!",
			error: "Forbidden API Route!",
		});
	};

	return (
		<Card className="w-[600px]">
			<CardHeader>
				<p className="text-center text-2xl font-semibold">🔑 Admin</p>
			</CardHeader>
			<CardContent className="space-y-4">
				{session.data?.user.role === "ADMIN" && (
					<FormSuccess message="You are allowed to see this content!" />
				)}
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
					<p className="text-sm font-medium">Admin-only API Route</p>
					<Button onClick={onApiRouteClick}>Click to test</Button>
				</div>

				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
					<p className="text-sm font-medium">Admin-only Server Action</p>
					<Button onClick={() => console.log("Server action clicked")}>
						Click to test
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default AdminPage;

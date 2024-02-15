/* eslint-disable no-restricted-syntax */

"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import DashboardHeader from "@/components/layouts/dashboard/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { TABS, type Tab } from "@/config/contribute";
import { Icons } from "@/components/icons";
import ReportForm from "@/components/forms/report-form";
import NoteForm from "@/components/forms/note-form";
import QuestionForm from "@/components/forms/question-form";

const ContributePage = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [selectedTab, setSelectedTab] = useState<Tab>(
		(searchParams?.get("tab") as Tab) ?? "mcq"
	);

	// Create query string
	const createQueryString = useCallback(
		(params: Record<string, string | number | null>) => {
			const newSearchParams = new URLSearchParams(searchParams?.toString());

			for (const [key, value] of Object.entries(params)) {
				if (value === null) {
					newSearchParams.delete(key);
				} else {
					newSearchParams.set(key, String(value));
				}
			}

			return newSearchParams.toString();
		},
		[searchParams]
	);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		router.push(
			`${pathname}?${createQueryString({
				tab: selectedTab,
			})}`,
			{
				scroll: false,
			}
		);
	}, [selectedTab]);

	return (
		<section className="container flex max-w-[72rem] flex-col items-center justify-start gap-4 text-center md:pl-0">
			<DashboardHeader
				heading="Contribute"
				text="Filling out this small prefilled form, is all you need to contribute."
			/>
			<Tabs
				defaultValue="account"
				className="my-2 w-full max-w-3xl"
				value={selectedTab}
				onValueChange={(value) => setSelectedTab(value as Tab)}
			>
				<TabsList className="hidden w-full grid-cols-3 md:grid">
					{TABS.map((tab) => {
						const Icon = Icons[tab.icon ?? "arrowRight"];
						return (
							<TabsTrigger key={`tab-${tab.value}`} value={tab.value}>
								<div className="flex items-center">
									<Icon className="mr-2 size-4" />
									{tab.label}
								</div>
							</TabsTrigger>
						);
					})}
				</TabsList>
				<Select
					defaultValue={selectedTab}
					onValueChange={(value) => setSelectedTab(value as Tab)}
				>
					<SelectTrigger
						className="flex items-center gap-2 md:hidden"
						aria-label="Select a field"
					>
						<SelectValue placeholder="Select a field">
							<span className="ml-2">
								{TABS.find((tab) => tab.value === selectedTab)?.label}
							</span>
						</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{TABS.map((tab) => {
							const Icon = Icons[tab.icon ?? "arrowRight"];
							return (
								<SelectItem key={`select-${tab.value}`} value={tab.value}>
									<div className="flex items-center gap-3">
										<Icon className="mr-2 size-4" />
										{tab.label}
									</div>
								</SelectItem>
							);
						})}
					</SelectContent>
				</Select>
				<TabsContent value="report">
					<div className="mx-auto my-4 flex-1 text-left lg:max-w-3xl">
						<ReportForm />
					</div>
				</TabsContent>
				<TabsContent value="notes">
					<div className="mx-auto my-4 flex-1 text-left lg:max-w-3xl">
						<NoteForm
							initialValues={{
								chapter: searchParams?.get("path")?.split("/")?.[4],
								course: searchParams?.get("path")?.split("/")?.[3],
								subChapter: searchParams
									?.get("path")
									?.split("/")?.[5]
									?.replace("-", " ")
									.replace(".mdx", "")
									.replace("index", ""),
							}}
						/>
					</div>
				</TabsContent>
				<TabsContent value="mcq">
					<div className="mx-auto my-4 flex-1 text-left lg:max-w-3xl">
						<QuestionForm />
					</div>
				</TabsContent>
			</Tabs>
		</section>
	);
};

export default ContributePage;

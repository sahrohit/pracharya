import { notFound, redirect } from "next/navigation";
import Report from "@/components/forms/report";
import { api } from "@/trpc/server";

const ReportPage = async ({ params }: { params: { slug: string } }) => {
	const report = await api.report.get.query({ id: params.slug });

	if (!report) {
		notFound();
	}

	if (report.status === "STARTED") {
		redirect(`/test/${params.slug}`);
	}

	return <Report report={report} />;
};

export default ReportPage;

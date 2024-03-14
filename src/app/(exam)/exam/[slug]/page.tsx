import { notFound, redirect } from "next/navigation";
import Test from "@/components/forms/test";
import { api } from "@/trpc/server";

const Exam = async ({ params }: { params: { slug: string } }) => {
	const test = await api.test.get.query({ id: params.slug });

	if (!test) {
		notFound();
	}

	if (test.status !== "STARTED") {
		redirect(`/report/${params.slug}`);
	}

	return <Test test={test} />;
};

export default Exam;

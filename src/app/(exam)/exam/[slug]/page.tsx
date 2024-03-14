import { notFound } from "next/navigation";
import Test from "@/components/forms/test";
import { api } from "@/trpc/server";

const Exam = async ({ params }: { params: { slug: string } }) => {
	const test = await api.test.get.query({ id: params.slug });

	if (!test) {
		notFound();
	}

	return <Test test={test} />;
};

export default Exam;

const Exam = async ({ params }: { params: { slug: string } }) => (
	<p>Report for: {params.slug}</p>
);

export default Exam;

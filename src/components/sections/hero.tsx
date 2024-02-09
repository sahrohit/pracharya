"use client";

import { useScroll, useTransform } from "framer-motion";
import React from "react";
import GoogleGeminiEffect from "@/components/shared/google-gemini-effect";

const GoogleGeminiEffectDemo = () => {
	const ref = React.useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});

	const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
	const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
	const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
	const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
	const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

	return (
		<div
			className="relative h-[400vh] w-full overflow-clip rounded-md bg-black pt-10 dark:border dark:border-white/[0.1]"
			ref={ref}
		>
			<GoogleGeminiEffect
				title="Prepare yourself for the test with Pracharya"
				description="Notes, Mock Tests, Community all for free."
				pathLengths={[
					pathLengthFirst,
					pathLengthSecond,
					pathLengthThird,
					pathLengthFourth,
					pathLengthFifth,
				]}
			/>
		</div>
	);
};

export default GoogleGeminiEffectDemo;

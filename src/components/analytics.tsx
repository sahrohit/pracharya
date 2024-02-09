"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { AxiomWebVitals } from "next-axiom";

import { env } from "@/env.js";

const Analytics = () => (
	<>
		<AxiomWebVitals />
		<GoogleAnalytics gaId={env.NEXT_PUBLIC_MEASUREMENT_ID ?? ""} />
	</>
);

export default Analytics;

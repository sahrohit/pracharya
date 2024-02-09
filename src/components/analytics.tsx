"use client";

import { GoogleAnalytics } from "@next/third-parties/google";

import { env } from "@/env.js";

const Analytics = () => (
	<GoogleAnalytics gaId={env.NEXT_PUBLIC_MEASUREMENT_ID ?? ""} />
);

export default Analytics;

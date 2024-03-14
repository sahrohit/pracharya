"use client";

import { Button } from "@/components/ui/button";

const Error = ({ reset }: { reset: () => void }) => (
	<div className="flex min-h-screen flex-col items-center justify-center">
		<h2 className="mb-5 text-center">Something went wrong!</h2>
		<Button type="submit" variant="default" onClick={() => reset()}>
			Try again
		</Button>
	</div>
);

export default Error;

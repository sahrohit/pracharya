"use client";

import useMounted from "@/components/hooks/use-mounted";

const ModalProvider = () => {
	const mounted = useMounted();

	if (!mounted) {
		return null;
	}

	return null;
};

export default ModalProvider;

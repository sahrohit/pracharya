"use client";

import useMounted from "@/components/hooks/use-mounted";
import AuthModal from "./layouts/auth-modal";

const ModalProvider = () => {
	const mounted = useMounted();

	if (!mounted) {
		return null;
	}

	return <AuthModal />;
};

export default ModalProvider;

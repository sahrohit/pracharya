"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/modal";
import TestForm from "@/components/forms/test-form";

const NewTestModal = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setOpen(true)}>Take a Mock Test</Button>
			<Modal showModal={open} setShowModal={() => setOpen(false)}>
				<h3 className="font-urban text-2xl font-bold">Start New Test</h3>
				<p className="text-sm">
					⚠️ Creating a Test is resource intensive from our side, please do not
					abandon the test after creation. If found abandoing multiple tests,
					actions will be taken.
				</p>
				<TestForm onSuccess={() => setOpen(false)} />
			</Modal>
		</>
	);
};

export default NewTestModal;

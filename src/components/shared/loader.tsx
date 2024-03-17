import { LuLoader2 } from "react-icons/lu";

export const Loader = () => <LuLoader2 className="animate-spin text-2xl" />;

export const PageLoader = () => (
	<div className="grid h-screen w-full place-content-center">
		<Loader />
	</div>
);

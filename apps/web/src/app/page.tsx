import RegisterButton from "@/components/RegisterButton";
import { trpc } from "@/utils/trpc";
import { cache } from "react";

export const revalidate = 0;

const Home = cache(async () => {
	const me = await trpc.auth.me.query();

	return (
		<div>
			<p>Hello {me.name}</p>

			<RegisterButton />
		</div>
	);
});

export default Home;

import { trpc } from "@/utils/trpc";
import { Button } from "@mantine/core";

export default async function Home() {
	const user = await trpc.userById.query("1");

	return (
		<div>
			<p>{user?.name}</p>
			<Button variant="filled">Button</Button>
		</div>
	);
}

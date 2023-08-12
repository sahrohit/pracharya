import { trpc } from "@/utils/trpc";

export default async function Home() {
	const user = await trpc.userById.query("1");

	return <p>{user?.name}</p>;
}

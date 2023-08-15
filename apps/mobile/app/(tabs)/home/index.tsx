import { Github, Twitter } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import {
	Button,
	H1,
	ListItem,
	Paragraph,
	ScrollView,
	Separator,
	Spinner,
	YGroup,
	YStack,
} from "tamagui";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { useEffect, useState } from "react";
import { MyStack } from "../../../components/MyStack";
import { trpc } from "../../../client";

export default function Home() {
	const { data, isLoading, refetch, error, isError } = trpc.auth.me.useQuery();

	const {
		mutateAsync,
		isLoading: loginLoading,
		error: loginError,
	} = trpc.auth.login.useMutation();

	const [key, setKey] = useState("");

	useEffect(() => {
		const getKey = async () => {
			const key = await getItemAsync("token");
			setKey(key ?? "");
		};
		getKey();
	}, []);

	return (
		<ScrollView>
			<MyStack>
				<YStack space="$4" maxWidth={600}>
					<H1 textAlign="center">
						Welcome to Tamagui Mr{" "}
						{isLoading && data ? "Loading..." : data?.name}.
					</H1>
					<Paragraph textAlign="center">
						Here&apos;s a basic to show navigating from one screen to another.
					</Paragraph>
					<Paragraph textAlign="center">Key {key}</Paragraph>
				</YStack>

				<Paragraph>Error: {isError && error?.message}</Paragraph>

				<Button onPress={() => refetch()}>Refetch</Button>
				<Button
					disabled={loginLoading}
					onPress={async () => {
						const { accessToken, refreshToken } = await mutateAsync({
							email: "sahrohit9586@gmail.com",
							password: "Lrg**cu2u95",
							schoolId: "test-school",
						});

						if (loginError) {
						}

						if (accessToken) {
							await setItemAsync("token", accessToken ?? "");
						}
					}}
				>
					{loginLoading ? <Spinner /> : "Login"}
				</Button>

				<Button
					onPress={async () => {
						await deleteItemAsync("token");
					}}
				>
					Logout
				</Button>

				<YStack space="$5">
					<YGroup bordered separator={<Separator />} theme="green">
						<YGroup.Item>
							<Link
								asChild
								href="https://twitter.com/natebirdman"
								hrefAttrs={{
									target: "_blank",
								}}
							>
								<ListItem hoverTheme title="Nate" pressTheme icon={Twitter} />
							</Link>
						</YGroup.Item>
						<YGroup.Item>
							<Link
								asChild
								href="https://github.com/tamagui/tamagui"
								hrefAttrs={{
									target: "_blank",
								}}
							>
								<ListItem hoverTheme pressTheme title="Tamagui" icon={Github} />
							</Link>
						</YGroup.Item>
						<YGroup.Item>
							<Link
								asChild
								href="https://github.com/ivopr/tamagui-expo"
								hrefAttrs={{
									target: "_blank",
								}}
							>
								<ListItem
									hoverTheme
									pressTheme
									title="This Template"
									icon={Github}
								/>
							</Link>
						</YGroup.Item>
					</YGroup>
				</YStack>
			</MyStack>
		</ScrollView>
	);
}

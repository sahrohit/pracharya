import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { getItemAsync } from "expo-secure-store";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import superjson from "superjson";
import { TamaguiProvider, Theme } from "tamagui";
import { trpc } from "../client";
import { MySafeAreaView } from "../components/MySafeAreaView";
import config from "../tamagui.config";
import { AuthProvider } from "../contexts/AuthContext";

export const unstable_settings = {
	initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

const Layout = () => {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
		InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
	});
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: `${process.env.EXPO_PUBLIC_API_URL}/trpc`,
					async headers() {
						return {
							Authorization: `Bearer ${await getItemAsync("token")}`,
						};
					},
				}),
			],
			transformer: superjson,
		})
	);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<TamaguiProvider config={config}>
					<Theme name={colorScheme === "dark" ? "dark" : "light"}>
						<AuthProvider>
							<MySafeAreaView>
								<Stack>
									<Stack.Screen
										name="(tabs)"
										options={{
											headerShown: false,
										}}
									/>
								</Stack>
							</MySafeAreaView>
						</AuthProvider>
					</Theme>
				</TamaguiProvider>
			</QueryClientProvider>
		</trpc.Provider>
	);
};

export default Layout;

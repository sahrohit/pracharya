import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import { useFonts } from "expo-font";
import { useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { TamaguiProvider, Theme } from "tamagui";
import { SplashScreen, Stack } from "expo-router";
import { trpc } from "../client";
import { MySafeAreaView } from "../components/MySafeAreaView";
import config from "../tamagui.config";

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
			// change the ip address to whatever address the Metro server is running on
			// if you're using a Simulator 'localhost' should work fine
			links: [
				httpBatchLink({ url: `${process.env.EXPO_PUBLIC_API_URL}/trpc` }),
			],
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
						<MySafeAreaView>
							<Stack
								screenOptions={{
									headerShown: false,
								}}
							/>
						</MySafeAreaView>
					</Theme>
				</TamaguiProvider>
			</QueryClientProvider>
		</trpc.Provider>
	);
};

export default Layout;

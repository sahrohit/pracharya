import type { AppType } from "next/app";
import { MantineProvider } from "@mantine/core";
import { trpc } from "../utils/trpc";
import theme from "@/config/theme";
import { Notifications } from "@mantine/notifications";

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
			<Notifications />
			<Component {...pageProps} />
		</MantineProvider>
	);
};

export default trpc.withTRPC(MyApp);

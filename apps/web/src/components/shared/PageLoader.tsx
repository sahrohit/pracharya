import { Loader, Text, Stack } from "@mantine/core";
import { PROD } from "../../../constants";

const PageLoader = ({ text }: { text?: string }) => (
	<Stack align="center" justify="center" h="100vh">
		<Loader size="xl" />
		{!PROD ? <Text>{text}</Text> : null}
	</Stack>
);

PageLoader.defaultProps = {
	text: "",
};

export default PageLoader;

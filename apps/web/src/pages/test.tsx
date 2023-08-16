import { trpc } from "@/utils/trpc";
import { Box, Button, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";

const TestPage = () => {
	const { data, isLoading, error, refetch } = trpc.auth.me.useQuery();
	const loginMutation = trpc.auth.login.useMutation({
		onSuccess: () => {
			console.log("success");
		},
		onError: (error) => {
			notifications.show({
				title: "An Error Occured",
				message: error.data?.zodError?.fieldErrors.email,
				color: "red",
			});
		},
	});

	// if (isLoading) return <PageLoader text="Loading" />;

	return (
		<Box>
			<Text>Data: {isLoading ? "Loading..." : data?.email}</Text>
			<Text>Error: {error?.message}</Text>

			<Button
				onClick={async () => {
					try {
						const res = await loginMutation.mutateAsync({
							email: "sahrohit9586@gmail.com",
							password: "Lrg**cu2u95",
							schoolId: "test-school",
						});

						localStorage.setItem("accessToken", res.accessToken);
						localStorage.setItem("refreshToken", res.refreshToken);
					} catch (error) {
						console.log(error);
					}
				}}
			>
				Regitser
			</Button>

			<Button
				onClick={async () => {
					localStorage.removeItem("accessToken");
					localStorage.removeItem("refreshToken");

					refetch();
				}}
				color="red"
			>
				Logut
			</Button>
		</Box>
	);
};

export default TestPage;

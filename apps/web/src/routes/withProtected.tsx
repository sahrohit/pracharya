import { useRouter } from "next/router";
import { NextPageContext } from "next";
import PageLoader from "@/components/shared/PageLoader";
import { trpc } from "@/utils/trpc";

const withProtected = (Component: any) =>
	function WithProtected(props: NextPageContext) {
		const { data, isLoading, error } = trpc.auth.me.useQuery();

		const router = useRouter();

		if (isLoading) {
			return <PageLoader text="User Loading" />;
		}

		if (error) {
			return <p>{error.message}</p>;
		}

		if (!data?.id) {
			router.replace(
				{
					pathname: "/auth/login",
					query: {
						redirect: router.pathname,
					},
				},
				undefined,
				{
					shallow: true,
				}
			);
			return <PageLoader text="Redirecting to Login" />;
		}

		return <Component {...props} />;
	};

export default withProtected;

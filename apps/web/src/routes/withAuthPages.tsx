import { NextPageContext } from "next";
import { useRouter } from "next/router";
import PageLoader from "@/components/shared/PageLoader";
import { trpc } from "@/utils/trpc";

const withAuthPages = (Component: any) =>
	function WithAuthPages(props: NextPageContext) {
		const { data, isLoading, error } = trpc.auth.me.useQuery();

		const router = useRouter();
		const { redirect } = router.query;

		if (isLoading) {
			return <PageLoader text="Loading User" />;
		}

		if (error) {
			return <p>{error.message}</p>;
		}

		if (data?.id) {
			if (redirect) {
				router.push(redirect as string);
			} else {
				router.push("/");
			}
			return <PageLoader text="Redirecting to Home" />;
		}

		return <Component {...props} />;
	};

export default withAuthPages;

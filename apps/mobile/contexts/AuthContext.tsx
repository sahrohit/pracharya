import { User } from "api/src/db/schema";
import { router, useSegments } from "expo-router";
import { ReactNode, createContext, useEffect, useContext } from "react";
import { trpc } from "../client";
import { Spinner } from "tamagui";

type AuthContextValue = {
	user: User | null | undefined;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// This hook can be used to access the user info.
export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const { data: user, isLoading } = trpc.auth.me.useQuery();

	console.log("Context Running");

	const segments = useSegments();

	useEffect(() => {
		const inAuthGroup = segments[0] === "(auth)";

		if (!isLoading) {
			if (
				// If the user is not signed in and the initial segment is not anything in the auth group.
				!user?.id &&
				!inAuthGroup
			) {
				// Redirect to the Login page.
				router.replace("/login");
			} else if (user?.id && inAuthGroup) {
				// Redirect away from the sign-in page.
				router.replace("/");
			}
		}
	}, [user, isLoading, segments]);

	if (isLoading) {
		return (
			<>
				<Spinner />
			</>
		);
	}

	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
}

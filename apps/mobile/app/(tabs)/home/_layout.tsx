import React from "react";
import { Stack } from "expo-router";

const HomeLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerTitle: "Home Screen",
				}}
			/>
		</Stack>
	);
};

export default HomeLayout;

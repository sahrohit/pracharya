import React from "react";
import { Tabs } from "expo-router";

const TabLayout = () => {
	return (
		<Tabs>
			<Tabs.Screen
				name="home"
				options={{
					headerShown: false,
				}}
			/>
			<Tabs.Screen name="list" />
		</Tabs>
	);
};

export default TabLayout;

import { Button } from "@mantine/core";

const RegisterButton = () => {
	return (
		<Button
			variant="outline"
			onClick={async () => {
				// const res = await trpc.auth.register.mutate({
				// 	email: "sahrohit9586@gmail.com",
				// 	name: "Rohit Sah",
				// 	schoolId: "test-school",
				// });
				// console.log(res);
			}}
		>
			Regitser
		</Button>
	);
};

export default RegisterButton;

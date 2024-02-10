import { type AvatarProps } from "@radix-ui/react-avatar";
import { LuUser } from "react-icons/lu";

import { type SelectUser } from "@/server/db/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps extends AvatarProps {
	user: Pick<SelectUser, "image" | "name">;
}

const UserAvatar = ({ user, ...props }: UserAvatarProps) => (
	<Avatar {...props}>
		{user.image ? (
			<AvatarImage
				alt="Picture"
				src={user.image}
				referrerPolicy="no-referrer"
			/>
		) : (
			<AvatarFallback>
				<span className="sr-only">{user.name}</span>
				<LuUser className="size-4" />
			</AvatarFallback>
		)}
	</Avatar>
);

export default UserAvatar;

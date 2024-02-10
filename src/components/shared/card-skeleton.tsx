import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => (
	<Card>
		<CardHeader className="gap-2">
			<Skeleton className="h-5 w-1/5" />
			<Skeleton className="size-4/5" />
		</CardHeader>
		<CardContent className="h-10" />
		<CardFooter>
			<Skeleton className="h-8 w-[120px]" />
		</CardFooter>
	</Card>
);

export default CardSkeleton;

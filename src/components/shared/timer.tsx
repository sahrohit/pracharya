/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { Progress } from "../ui/progress";

const Timer = ({ endTime, duration }: { endTime: Date; duration: number }) => {
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setSeconds((endTime.getTime() - new Date().getTime()) / 1000);
		}, 1000);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		return () => clearInterval(timer as any);
	}, [seconds]);

	const { hoursLeft, minsLeft, secondsLeft } = useMemo(() => {
		const hoursLeft = Math.floor(seconds / 3600);
		const minsLeft = Math.floor((seconds - hoursLeft * 3600) / 60);
		const secondsLeft = Math.round(seconds - hoursLeft * 3600 - minsLeft * 60);
		return {
			hoursLeft,
			minsLeft,
			secondsLeft,
		};
	}, [seconds]);

	if (seconds === 1) {
		window.location.reload();
	}

	return (
		<>
			<Progress value={(seconds * 100) / duration} />
			<p className="text-5xl">
				{`${hoursLeft.toLocaleString("en-US", {
					minimumIntegerDigits: 2,
					useGrouping: false,
				})}:${minsLeft.toLocaleString("en-US", {
					minimumIntegerDigits: 2,
					useGrouping: false,
				})}:${secondsLeft.toLocaleString("en-US", {
					minimumIntegerDigits: 2,
					useGrouping: false,
				})}`}
			</p>
		</>
	);
};

export default Timer;

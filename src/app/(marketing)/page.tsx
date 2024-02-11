import Image from "next/image";
import Link from "next/link";
import { LuHelpingHand } from "react-icons/lu";

import siteConfig from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import sharingNotesImage from "@/../public/assets/hero/sharing-notes.svg";

const IndexPage = () => (
	<section className="space-y-6 pb-12 pt-16 lg:py-28">
		<div className="container flex max-w-[68rem] flex-col-reverse items-center justify-center gap-4 text-center md:flex-row md:pl-0">
			<Image
				draggable="false"
				priority
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				src={sharingNotesImage}
				alt="Notes Sharing"
				width="500"
				height="500"
				loading="eager"
			/>
			<div className="container flex max-w-[68rem] flex-col items-center gap-5 text-center">
				<Link
					href="/#pricing"
					className={cn(
						buttonVariants({ variant: "outline", size: "sm" }),
						"flex animate-fade-up flex-col text-balance opacity-0 md:flex-row"
					)}
					style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
				>
					Free Notes, Mock Exams, and a Community for Exams in Nepal
				</Link>

				<h1
					className="font-urban animate-fade-up  text-balance text-4xl font-extrabold tracking-tight opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
					style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
				>
					Conquer Your{" "}
					<span className="text-gradient_indigo-purple font-extrabold">
						Exam{" "}
					</span>
					Goals
				</h1>

				<p
					className="max-w-[68rem] animate-fade-up text-balance leading-normal text-muted-foreground opacity-0 sm:text-xl sm:leading-8"
					style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
				>
					Share tips, ask questions, and get support from a vibrant community of
					fellow students preparing for the same exams.
				</p>

				<div
					className="flex animate-fade-up justify-center space-x-2 opacity-0 md:space-x-4"
					style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
				>
					<Link
						href="/computer-engineering"
						className={cn(buttonVariants({ size: "lg" }))}
					>
						Study Notes
					</Link>
					<Link
						href={siteConfig.links.email}
						target="_blank"
						rel="noreferrer"
						className={cn(
							buttonVariants({ variant: "outline", size: "lg" }),
							"px-4"
						)}
					>
						<LuHelpingHand className="mr-2 size-4" />
						<p>Contribute</p>
					</Link>
				</div>
			</div>
		</div>
	</section>
);

export default IndexPage;

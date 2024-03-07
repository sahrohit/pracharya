import Link from "next/link";
import Logo from "@/components/logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
	<div className="container relative hidden h-screen min-h-[600px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
		<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
			<div className="absolute inset-0 bg-zinc-900" />
			<Link
				href="/"
				className="relative z-20 flex items-center gap-2 text-lg font-medium"
			>
				<Logo />
				Pracharya
			</Link>
			<div className="relative z-20 mt-auto">
				<blockquote className="space-y-2">
					<p className="text-lg">
						&ldquo;None of us, including me, ever do great things. But we can
						all do small things, with great love, and together we can do
						something wonderful.&rdquo;
					</p>
					<footer className="text-sm">Mother Teresa</footer>
				</blockquote>
			</div>
		</div>
		<div className="lg:p-8">
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col space-y-2 text-left">
					<h1 className="text-2xl font-semibold tracking-tight">
						Welcome back,
					</h1>
					<p className="text-sm text-muted-foreground">
						Log in to your account
					</p>
				</div>
				{children}
			</div>
		</div>
	</div>
);

export default AuthLayout;

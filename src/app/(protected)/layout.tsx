import Navbar from "./_components/navbar";

interface ProtectedLayoutProps {
	children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => (
	<div className="flex h-screen w-full flex-col items-center justify-center gap-y-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
		<Navbar />
		{children}
	</div>
);

export default ProtectedLayout;

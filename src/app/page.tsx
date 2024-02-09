import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className,
          )}
        >
          🔐 Auth
        </h1>
        <p className="text-lg text-white">A simple authentication service</p>
        <div>
          <Button asChild variant="secondary" size="lg">
            <Link href="/auth/login">Sign in</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

import { Social } from "@/components/auth/social";
import LoginForm from "@/components/forms/login-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
const LoginPage = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <div className="flex w-full flex-col items-center justify-center gap-y-4">
          <h1 className="text-3xl font-semibold">Login</h1>
          <p className="text-sm text-muted-foreground">Welcome back</p>
        </div>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Social />
        <Button variant="link" className="w-full font-normal" size="sm" asChild>
          <Link href="/auth/register">Dont have an account, Sign Up?</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;

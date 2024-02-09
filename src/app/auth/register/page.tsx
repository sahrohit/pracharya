import { Social } from "@/components/auth/social";
import RegisterForm from "@/components/forms/register-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <div className="flex w-full flex-col items-center justify-center gap-y-4">
          <h1 className="text-3xl font-semibold">Create An Account</h1>
          <p className="text-sm text-muted-foreground">Pracharya</p>
        </div>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Social />
        <Button variant="link" className="w-full font-normal" size="sm" asChild>
          <Link href="/auth/login">Already have a account, Login?</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RegisterPage;

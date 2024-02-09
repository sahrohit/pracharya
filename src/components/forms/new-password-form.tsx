"use client";

import type * as z from "zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { newPassword } from "@/server/actions/new-password";
import { toast } from "sonner";
import { catchError } from "@/lib/catch-error";
import { NewPasswordFormSchema } from "../schema/auth";

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordFormSchema>>({
    resolver: zodResolver(NewPasswordFormSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordFormSchema>) => {
    startTransition(async () => {
      toast.promise(newPassword(values, token), {
        loading: "Resetting password...",
        success: "Password reset!",
        error: catchError,
      });
    });
  };

  if (!token) {
    toast.error("Missing token!");
    return redirect("/auth/login");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={form.formState.isSubmitting}
                    placeholder="******"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* <FormError message={error} />
        <FormSuccess message={success} /> */}
        <Button
          disabled={form.formState.isSubmitting || isPending}
          type="submit"
          className="w-full"
        >
          Reset password
        </Button>
      </form>
    </Form>
  );
};

export default NewPasswordForm;

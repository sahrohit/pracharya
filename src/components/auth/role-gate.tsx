"use client";

import { FormError } from "@/components/form-error";
import { type SelectUser } from "@/server/db/types";
import { useSession } from "next-auth/react";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: SelectUser["role"];
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const session = useSession();

  if (session.data?.user?.role !== allowedRole) {
    return (
      <FormError message="You do not have permission to view this content!" />
    );
  }

  return <>{children}</>;
};

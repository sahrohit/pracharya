"use client";

import { UserInfo } from "@/components/user-info";
import { useSession } from "next-auth/react";

const ClientPage = () => {
  const session = useSession();

  return <UserInfo label="📱 Client component" user={session.data?.user} />;
};

export default ClientPage;

import AuthForm from "@/components/auth/auth-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

export default function Auth() {
  const { data: session, status } = useSession();
  const { push } = useRouter();

  if (status === "authenticated") {
    push("/");
  } else {
    if (status === "loading") {
      return <p className="mx-auto my-12 text-center">Loading...</p>;
    }
    return <AuthForm />;
  }
}

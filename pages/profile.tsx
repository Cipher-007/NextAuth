import UserProfile from "@/components/profile/user-profile";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Profile() {
  return <UserProfile />;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

import React from "react";
import MainNavigation from "./main-navigation";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
    </>
  );
}

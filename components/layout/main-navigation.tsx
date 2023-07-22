import { data } from "autoprefixer";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function MainNavigation() {
  const { data: session, status } = useSession();

  function logoutHandler() {
    signOut();
  }

  return (
    <header className="flex h-20 w-full items-center  justify-between bg-purple-950 px-[10%] py-0 shadow-[0_1px_4px_rgba(0,0,0,0.2)]">
      <Link
        className="font-bold text-white no-underline hover:bg-purple-400"
        href="/"
      >
        <div className="m-0 font-sans text-[2rem] text-white">Next Auth</div>
      </Link>
      <nav>
        <ul className="m-0 flex list-none items-baseline p-0">
          {status === "unauthenticated" && (
            <li className="mx-4 my-0">
              <Link
                className="font-bold text-white no-underline hover:bg-purple-400"
                href="/auth"
              >
                Login
              </Link>
            </li>
          )}
          {status === "authenticated" && (
            <li className="mx-4 my-0">
              <Link
                className="font-bold text-white no-underline hover:text-purple-400"
                href="/profile"
              >
                Profile
              </Link>
            </li>
          )}
          {status === "authenticated" && (
            <li className="mx-4 my-0">
              <button
                onClick={logoutHandler}
                className="cursor-pointer rounded-md border border-solid border-white bg-transparent px-6 py-2 font-bold text-white hover:bg-purple-400 hover:text-purple-950"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

import React, { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

async function createUser(email: string, password: string) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

export default function AuthForm() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const { replace } = useRouter();

  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandle(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result?.error) {
        replace("/profile");
      }
    } else {
      if (enteredEmail && enteredPassword) {
        try {
          const result = await createUser(enteredEmail, enteredPassword);
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      } else {
        throw new Error("Email and Password not entered");
      }
    }
  }

  return (
    <section className="mx-auto my-12 w-[95%] max-w-[25rem] rounded-md bg-purple-950 p-4 text-center shadow-[0_1px_4px_rgba(0,0,0,0.2)]">
      <h1 className="mb-4 mt-4 text-center text-2xl font-bold text-white">
        {isLogin ? "Login" : "Sign up"}
      </h1>
      <form onSubmit={submitHandle}>
        <div className="mb-2">
          <label htmlFor="email" className="mb-2 block font-bold text-white">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            ref={emailInputRef}
            required
            className="w-full rounded border border-solid border-white bg-purple-100 p-1 text-left"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="mb-2 block font-bold text-white">
            Your Password
          </label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            required
            className="w-full rounded border border-solid border-white bg-purple-100 p-1 text-left"
          />
        </div>
        <div className="mt-6 flex flex-col items-center">
          <button className="cursor-pointer rounded border border-solid border-purple-500 bg-purple-500 px-10 py-2 text-white hover:border-purple-700 hover:bg-purple-700">
            {isLogin ? "Login" : "Create Account"}
          </button>
          <button
            type="button"
            className="mt-4 cursor-pointer rounded  bg-purple-500 bg-transparent px-6 py-[0.15rem] text-purple-500  hover:border-purple-700 hover:bg-slate-400 hover:bg-transparent"
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

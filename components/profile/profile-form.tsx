import { ProfileFormProps } from "@/types/type";
import React, { useRef } from "react";

export default function ProfileForm({ onChangePassword }: ProfileFormProps) {
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const oldPasswordRef = useRef<HTMLInputElement>(null);

  function submitHandler(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current!.value;
    const enteredNewPassword = newPasswordRef.current!.value;

    onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  }

  return (
    <form
      className="mx-auto my-8 w-[95%] max-w-[25rem]"
      onSubmit={submitHandler}
    >
      <div className="mb-2">
        <label
          htmlFor="new-password"
          className="mb-2 block font-bold text-neutral-700"
        >
          New Password
        </label>
        <input
          type="password"
          id="new-password"
          ref={newPasswordRef}
          required
          className="block w-full rounded border border-solid border-purple-950 bg-violet-50 p-1"
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="old-password"
          className="mb-2 block font-bold text-neutral-700"
        >
          Old Password
        </label>
        <input
          type="password"
          id="old-password"
          ref={oldPasswordRef}
          required
          className="block w-full rounded border border-solid border-purple-950 bg-violet-50 p-1"
        />
      </div>
      <div className="mt-6">
        <button className="solid cursor-pointer rounded border border-purple-950 bg-purple-950 px-6 py-2 text-white">
          Change Password
        </button>
      </div>
    </form>
  );
}

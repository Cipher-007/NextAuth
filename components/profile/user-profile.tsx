import React from "react";
import ProfileForm from "./profile-form";
import { ChangePassword } from "@/types/type";

export default function UserProfile() {
  async function changePasswordHandler(passwordData: ChangePassword) {
    try {
      const response = await fetch("/api/user/change-password", {
        method: "PATCH",
        body: JSON.stringify(passwordData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className="mx-auto my-12 text-center">
      <h1 className="text-[5rem]">Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

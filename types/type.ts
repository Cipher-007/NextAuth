export type ChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type ProfileFormProps = {
  onChangePassword: ({ oldPassword, newPassword }: ChangePassword) => void;
};

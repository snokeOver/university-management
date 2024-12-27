export interface ILoginUser {
  id: string;
  password: string;
}

export interface IChangeUserPassword {
  oldPassword: string;
  newPassword: string;
}

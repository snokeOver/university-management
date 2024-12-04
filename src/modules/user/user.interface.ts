export interface IUser {
  id: string;
  email: string;
  password: string;
  needPasswordChange: boolean;
  role: "Student" | "Admin" | "Faculty";
  status: "Active" | "InActive";
  isDeleted: boolean;
}

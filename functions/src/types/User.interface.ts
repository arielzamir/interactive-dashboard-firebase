export interface UserAuth {
  email: string;
  password: string;
}
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
}

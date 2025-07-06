export type UserAuth = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
};

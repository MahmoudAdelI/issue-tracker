import { User } from "@prisma/client";

export const mockUsers: User[] = [
  {
    name: "user",
    id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    image: null,
    email: "lorem@gmail.com",
    emailVerified: null,
  },
  {
    name: "user2",
    id: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
    image: null,
    email: "lorem2@gmail.com",
    emailVerified: null,
  },
];

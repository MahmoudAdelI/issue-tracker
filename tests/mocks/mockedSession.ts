import { Session } from "next-auth";

export const mockSession: Session = {
  user: {
    name: "name",
    email: "email",
    image: "image",
  },
  expires: "expires",
};

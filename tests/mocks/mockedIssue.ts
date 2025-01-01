import { Issue } from "@prisma/client";

export const mockIssue: Issue = {
  id: 1,
  title: "title",
  description: "description",
  status: "OPEN",
  createdAt: new Date(),
  updatedAt: new Date(),
  assignedToUserId: "1",
};
export const mockIssues: Issue[] = [
  {
    title: "Issue 1",
    id: 1,
    description: "Issue 1 description",
    status: "OPEN",
    createdAt: new Date(),
    updatedAt: new Date(),
    assignedToUserId: "1",
  },
  {
    title: "Issue 2",
    id: 2,
    description: "Issue 2 description",
    status: "CLOSED",
    createdAt: new Date(),
    updatedAt: new Date(),
    assignedToUserId: "1",
  },
];

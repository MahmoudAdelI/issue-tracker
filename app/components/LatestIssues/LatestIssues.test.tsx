import { render } from "@testing-library/react";
import LatestIssues, { LatestIssuesProps } from "./LatestIssues";
import { mockIssues } from "@/__mocks__/mockedIssue";
import prisma from "@/prisma/client";
const latestIssuesProps: LatestIssuesProps[] = [
  {
    title: "Issue 1",
    id: 1,
    description: "Issue 1 description",
    status: "OPEN",
    createdAt: new Date(),
    updatedAt: new Date(),
    assignedToUserId: "1",
    assignedToUser: {
      id: "1",
      name: "user",
      email: "lorem@gmail.com",
      emailVerified: null,
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocLfw6uYRuLI7yNRagzmanMmJyYhSO_DmUTjryM4kw6O1Ib_uQ=s96-c",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
];
it("should render", async () => {
  (prisma.issue.findMany as jest.Mock).mockResolvedValueOnce(mockIssues);

  render(<LatestIssues issues={latestIssuesProps} />);
});

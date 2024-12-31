import prisma from "@/prisma/client";
import { Theme } from "@radix-ui/themes";
import { render } from "@testing-library/react";
import { SearchParams } from "./_components/IssueTable/IssueTable";
import IssuesPage from "./page";
import { mockIssues } from "@/__mocks__/mockedIssue";

const generateSearchParams = async (params: SearchParams) => params;

const params: SearchParams = {
  status: "OPEN",
  orderBy: "id",
  order: "asc",
  page: "1",
};

describe("IssuesPage", () => {
  (prisma.issue.findMany as jest.Mock).mockResolvedValue(mockIssues);
  const searchParams = generateSearchParams(params);
  it("renders without crashing", async () => {
    const page = await IssuesPage({ searchParams });
    render(<Theme>{page}</Theme>);
  });
});

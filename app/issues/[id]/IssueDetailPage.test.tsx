import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { render, screen } from "@testing-library/react";
import { getServerSession } from "next-auth";
import IssueDetailPage from "./page";
import { useQuery } from "@tanstack/react-query";
import { mockUsers } from "@/__mocks__/mockedUsers";
import { Theme } from "@radix-ui/themes";
import { mockIssue } from "@/__mocks__/mockedIssue";

jest.mock("next/link", () => {
  return ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
});
jest.mock("react-markdown", () => {
  return ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
});

jest.mock("react", () => {
  const testCache = <T extends (...args: Array<unknown>) => unknown>(func: T) =>
    func;
  const originalModule = jest.requireActual("react");
  return {
    ...originalModule,
    cache: testCache,
  };
});

const generateParams = async (params: { id: string }) => params;
const paramsID = { id: "1" };
describe("IssueDetailPage", () => {
  it("should render IssueDetailPage", async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce(true);
    (useQuery as jest.Mock).mockReturnValueOnce({
      data: mockUsers,
      error: false,
      isLoading: false,
    });
    (prisma.issue.findUnique as jest.Mock).mockResolvedValue(mockIssue); // Mocked response

    const params = generateParams(paramsID);
    const page = await IssueDetailPage({ params });
    render(<Theme>{page}</Theme>);

    const deleteButton = screen.getByText("Delete Issue");
    expect(deleteButton).toBeInTheDocument();

    const AssigneeSelector = screen.getByText("user");
    expect(AssigneeSelector).toBeInTheDocument();

    const editButton = screen.getByText("Edit Issue");
    expect(editButton).toBeInTheDocument();
  });
});

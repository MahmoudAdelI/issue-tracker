import { mockIssues } from "@/tests/mocks/mockedIssue";
import prisma from "@/prisma/client";
import { render, screen } from "@testing-library/react";
import Home from "./page";
const mockedIssueCounts = [
  { _count: { status: 9 }, status: "IN_PROGRESS" },
  { _count: { status: 6 }, status: "CLOSED" },
  { _count: { status: 5 }, status: "OPEN" },
];
it("should render", async () => {
  (prisma.issue.groupBy as jest.Mock).mockResolvedValueOnce(mockedIssueCounts);
  (prisma.issue.findMany as jest.Mock).mockResolvedValueOnce(mockIssues);

  const page = await Home();
  render(page);

  const latestIssues = screen.getByText("Latest Issues");
  expect(latestIssues).toBeInTheDocument();

  const chart = screen.getByTestId("chart");
  expect(chart).toBeInTheDocument();

  const summary = screen.getByTestId("summary");
  expect(summary).toBeInTheDocument();
});

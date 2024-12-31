import { fireEvent, render, screen } from "@testing-library/react";
import { Theme } from "@radix-ui/themes";
import IssueTable, { SearchParams } from "./IssueTable";
import { Issue } from "@prisma/client";
const mockIssues: Issue[] = [
  {
    title: "Issue 1",
    id: 1,
    description: "Issue 1 description",
    status: "OPEN",
    createdAt: new Date(),
    updatedAt: new Date(),
    assignedToUserId: "1",
  },
];
const mockSearchParams: SearchParams = {
  status: "OPEN",
  orderBy: "title",
  order: "asc",
  page: "1",
};
const testSorting = (linkName: string) => {
  render(<MockIssueStatusFilter />);
  const issueHeader = screen.getByRole("link", {
    name: linkName,
  });
  const searchParams = new URLSearchParams(issueHeader.getAttribute("href")!);
  expect(searchParams.get("order")).toBe("desc");

  fireEvent.click(issueHeader);
  const newSearchParams = new URLSearchParams(
    issueHeader.getAttribute("href")!
  );
  expect(newSearchParams.get("order")).toBe("asc");
};
const MockIssueStatusFilter = () => (
  <Theme>
    <IssueTable searchParams={mockSearchParams} issues={mockIssues} />
  </Theme>
);
it("should render", () => {
  render(<MockIssueStatusFilter />);
});

it("should render table header", () => {
  render(<MockIssueStatusFilter />);
  expect(screen.getByText("Issue")).toBeInTheDocument();
  expect(screen.getByText("Status")).toBeInTheDocument();
  expect(screen.getByText("Created")).toBeInTheDocument();
});
describe("tableHeader", () => {
  describe("Issue", () => {
    it("should have href of desc order and change to asc after click", () => {
      testSorting("Sort by Issue");
    });
  });
  describe("Status", () => {
    it("should have href of desc order and change to asc after click", () => {
      testSorting("Sort by Status");
    });
  });
  describe("CreatedAt", () => {
    it("should have href of desc order and change to asc after click", () => {
      testSorting("Sort by Created");
    });
  });
});

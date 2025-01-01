import { render, screen } from "@testing-library/react";
import { Theme } from "@radix-ui/themes";
import IssueStatusFilter from "./IssueStatusFilter";

const MockIssueStatusFilter = () => (
  <Theme>
    <IssueStatusFilter />
  </Theme>
);
it("should render", () => {
  render(<MockIssueStatusFilter />);
  const issueStatusFilter = screen.getByRole("combobox");
  expect(issueStatusFilter).toBeInTheDocument();
});

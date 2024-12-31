import { render, screen } from "@testing-library/react";
import IssueActions from "./IssueActions";
import { Theme } from "@radix-ui/themes";

const MockIssueActions = () => (
  <Theme>
    <IssueActions />
  </Theme>
);
it("should render New Issue button", () => {
  render(<MockIssueActions />);
  const newIssueBtn = screen.getByText("New Issue");
  expect(newIssueBtn).toBeInTheDocument();
});
it("should render IssueStatusFilter component", () => {
  render(<MockIssueActions />);
  const IssueStatusFilter = screen.getByRole("combobox");
  expect(IssueStatusFilter).toBeInTheDocument();
});

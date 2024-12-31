import { render, screen } from "@testing-library/react";
import IssueStatusBadge from "./IssueStatusBadge";
import { Status } from "@prisma/client";
const testBadgeColor = (status: Status, color: string) => {
  render(<IssueStatusBadge status={status} />);
  expect(screen.getByTestId("badge")).toHaveAttribute(
    "data-accent-color",
    color
  );
};
describe("renders the badge with the correct color and label", () => {
  it('should render badge in red with label "Open"', () => {
    testBadgeColor(Status.OPEN, "red");
  });
  it('should render badge in violet with label "In Progress"', () => {
    testBadgeColor(Status.IN_PROGRESS, "violet");
  });
  it('should render badge in green with label "Closed"', () => {
    testBadgeColor(Status.CLOSED, "green");
  });
});

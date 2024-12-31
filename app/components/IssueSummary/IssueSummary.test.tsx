import { render, screen } from "@testing-library/react";
import IssueSummary, { IssueSummaryProps } from "./IssueSummary";
const issueSummaryProps: IssueSummaryProps = {
  open: 1,
  inProgress: 2,
  closed: 3,
};
const testLink = (label: string, href: string) => {
  render(<IssueSummary {...issueSummaryProps} />);
  const link = screen.getByText(label);
  expect(link.getAttribute("href")).toBe(href);
};
describe("IssueSummary", () => {
  it("should render", () => {
    render(<IssueSummary {...issueSummaryProps} />);
  });
  describe("should have href of it's label", () => {
    it("Open Issues", () => {
      testLink("Open Issues", "/issues/list?status=OPEN");
    });
    it("In-progress Issues", () => {
      testLink("In-progress Issues", "/issues/list?status=IN_PROGRESS");
    });
    it("Closed Issues", () => {
      testLink("Closed Issues", "/issues/list?status=CLOSED");
    });
  });
});

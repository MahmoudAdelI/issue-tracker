import { render, screen } from "@testing-library/react";
import EditIssueButton from "./EditIssueButton";

it("should render EditIssueButton component", () => {
  render(<EditIssueButton issueId={1} />);
  const editeButtonLink = screen.getByRole("link", { name: "Edit Issue" });
  expect(editeButtonLink).toBeInTheDocument();
  expect(editeButtonLink).toHaveAttribute("href", "/issues/edit/1");
});

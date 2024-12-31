import { render, screen } from "@testing-library/react";
import Pagination, { PaginationProps } from "./Pagination";
const paginationProps: PaginationProps = {
  issuesCount: 10,
  perPageIssues: 5,
  currentPage: 1,
};
describe("Pagination", () => {
  it("renders without crashing", () => {
    render(<Pagination {...paginationProps} />);
  });
  it("prev button should be disabled if currentPage is 1", () => {
    render(<Pagination {...paginationProps} />);
    expect(screen.getByTestId("prev-button")).toBeDisabled();
    expect(screen.getByTestId("first-button")).toBeDisabled();
  });
  it("next button should be disabled if currentPage is the last page", () => {
    render(<Pagination {...paginationProps} currentPage={2} />);
    expect(screen.getByTestId("next-button")).toBeDisabled();
    expect(screen.getByTestId("last-button")).toBeDisabled();
  });
});

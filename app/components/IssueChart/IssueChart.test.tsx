import { render } from "@testing-library/react";
import IssueChart from "./IssueChart";
import { IssueChartProps } from "./IssueChart";

const issueChartProps: IssueChartProps = {
  open: 1,
  inProgress: 2,
  closed: 3,
};
describe("IssueChart", () => {
  it("should render", () => {
    render(<IssueChart {...issueChartProps} />);
  });
});

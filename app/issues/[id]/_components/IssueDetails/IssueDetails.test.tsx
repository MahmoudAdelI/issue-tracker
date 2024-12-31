import { mockIssue } from "@/__mocks__/mockedIssue";
import { mockSession } from "@/__mocks__/mockedSession";
import { Theme } from "@radix-ui/themes";
import { fireEvent, render, screen } from "@testing-library/react";
import IssueDetails from "./IssueDetails";

// mock react-markdown
jest.mock("react-markdown", () => {
  return ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
});

describe("IssueDetails", () => {
  it("should render", async () => {
    const IssueDetailsComponent = IssueDetails({
      issue: mockIssue,
      session: mockSession,
    });
    render(<Theme>{IssueDetailsComponent}</Theme>);

    const title = screen.getByText("title");
    expect(title).toBeInTheDocument();

    const badge = screen.getByTestId("badge");
    expect(badge).toBeInTheDocument();

    const description = screen.getByText("description");
    expect(description).toBeInTheDocument();

    const IssueStatusSelector = screen.getByRole("combobox");
    expect(IssueStatusSelector).toBeInTheDocument();
  });
  it("should not render 'IssueStatusSelect' if session isn't available", async () => {
    const IssueDetailsComponent = IssueDetails({
      issue: mockIssue,
      session: null,
    });
    render(<Theme>{IssueDetailsComponent}</Theme>);

    const IssueStatusSelector = screen.queryByRole("combobox");
    expect(IssueStatusSelector).not.toBeInTheDocument();
  });
  it('should change the status of the issue when "IssueStatusSelect" is changed', async () => {
    const IssueDetailsComponent = IssueDetails({
      issue: mockIssue,
      session: mockSession,
    });
    render(<Theme>{IssueDetailsComponent}</Theme>);
    const IssueStatusSelector = screen.getByRole("combobox");

    fireEvent.click(IssueStatusSelector);
    const option = screen.getByText("In Progress");
    fireEvent.click(option);

    expect(IssueStatusSelector).toHaveTextContent(/In Progress/i);
  });
});

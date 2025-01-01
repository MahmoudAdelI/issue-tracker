import { mockIssue } from "@/tests/mocks/mockedIssue";
import { Theme } from "@radix-ui/themes";
import { act, fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import IssueStatusSelect from "./IssueStatusSelect";

it("should render ", async () => {
  render(
    <Theme>
      <IssueStatusSelect issue={mockIssue} />
    </Theme>
  );

  const selectElement = screen.getByRole("combobox");
  expect(selectElement).toBeInTheDocument();
  fireEvent.click(selectElement);

  const closedOption = screen.getByText("Closed");
  expect(closedOption).toBeInTheDocument();
  await act(async () => {
    fireEvent.click(closedOption);
  });

  expect(axios.patch).toHaveBeenCalledWith(`/api/issues/${mockIssue.id}`, {
    status: "CLOSED",
  });
});

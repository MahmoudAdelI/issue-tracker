import { Issue } from "@prisma/client";
import { act, fireEvent, render, screen } from "@testing-library/react";
import IssueStatusSelect from "./IssueStatusSelect";
import { Theme } from "@radix-ui/themes";
import axios from "axios";
import { mockIssue } from "@/__mocks__/mockedIssue";

it("should render ", async () => {
  render(
    <Theme>
      <IssueStatusSelect issue={mockIssue} />
    </Theme>
  );

  const SelectElement = screen.getByRole("combobox");
  expect(SelectElement).toBeInTheDocument();
  fireEvent.click(SelectElement);

  const ClosedOption = screen.getByText("Closed");
  expect(ClosedOption).toBeInTheDocument();
  await act(async () => {
    fireEvent.click(ClosedOption);
  });

  expect(axios.patch).toHaveBeenCalledWith(`/api/issues/${mockIssue.id}`, {
    status: "CLOSED",
  });
});

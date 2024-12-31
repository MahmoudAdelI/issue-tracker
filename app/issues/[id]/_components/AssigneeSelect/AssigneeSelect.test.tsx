import { mockIssue } from "@/__mocks__/mockedIssue";
import { mockUsers } from "@/__mocks__/mockedUsers";
import { Issue } from "@prisma/client";
import { Theme } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { act, fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { undefined } from "zod";
import AssigneeSelect from "./AssigneeSelect";
const MockedAssigneeSelect = ({ mockIssue }: { mockIssue: Issue }) => (
  <Theme>
    <AssigneeSelect issue={mockIssue} />
  </Theme>
);

jest.mock("axios");

describe("AssigneeSelect", () => {
  it("renders the AssigneeSelect component", async () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      data: mockUsers,
      error: false,
      isLoading: false,
    });
    render(<MockedAssigneeSelect mockIssue={mockIssue} />);

    const AssigneeSelector = screen.getByRole("combobox");
    expect(AssigneeSelector).toBeInTheDocument();
  });

  it("should handle error state", async () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      data: undefined,
      error: true,
      isLoading: false,
    });
    render(<MockedAssigneeSelect mockIssue={mockIssue} />);

    const AssigneeSelector = screen.queryByRole("combobox");
    expect(AssigneeSelector).not.toBeInTheDocument();
  });
  it("should assigns issue to a user", async () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      data: mockUsers,
      error: false,
      isLoading: false,
    });
    render(<MockedAssigneeSelect mockIssue={mockIssue} />);

    const AssigneeSelector = screen.getByRole("combobox");
    fireEvent.click(AssigneeSelector);

    const user2 = screen.getByText("user2");
    await act(async () => {
      fireEvent.click(user2);
    });

    expect(axios.patch).toHaveBeenCalledWith(`/api/issues/${mockIssue.id}`, {
      assignedToUserId: "2",
    });
  });
});

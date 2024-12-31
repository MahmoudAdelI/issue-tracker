import { act, fireEvent, render, screen } from "@testing-library/react";
import DeleteIssueButton from "./DeleteIssueButton";
import axios from "axios";

const deleteIssue = async () => {
  const deletButton = screen.getByText("Delete Issue");
  expect(deletButton).toBeInTheDocument();
  fireEvent.click(deletButton);
  const confirmButton = screen.getByText("Delete");
  await act(async () => {
    fireEvent.click(confirmButton);
  });
};

describe("DeleteIssueButton", () => {
  it("should delete issue", async () => {
    render(<DeleteIssueButton issueId={1} />);
    await deleteIssue();
    expect(axios.delete).toHaveBeenCalledWith("/api/issues/1");
  });
  it("should show error dialog", async () => {
    (axios.delete as jest.Mock).mockRejectedValueOnce(new Error());
    render(<DeleteIssueButton issueId={1} />);
    await deleteIssue();
    const errorDialog = await screen.findByText("Error");
    expect(errorDialog).toBeInTheDocument();
  });
});

import { mockIssue } from "@/tests/mocks/mockedIssue";
import { act, fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import IssueForm from "./IssueForm";

describe("IssueForm", () => {
  describe("Submiting new issue", () => {
    it("should render IssueForm elements", () => {
      render(<IssueForm />);
      const title = screen.getByPlaceholderText("Title");
      expect(title).toBeInTheDocument();

      const description = screen.getByPlaceholderText("Description");
      expect(description).toBeInTheDocument();

      const submitButton = screen.getByText("Submit New Issue");
      expect(submitButton).toBeInTheDocument();
    });

    it("should call axios.post when submit button is clicked", async () => {
      (axios.post as jest.Mock).mockResolvedValueOnce({});
      render(<IssueForm />);
      const title = screen.getByPlaceholderText("Title");
      const description = screen.getByPlaceholderText("Description");
      const submitButton = screen.getByText("Submit New Issue");

      fireEvent.change(title, { target: { value: "Test Issue" } });
      fireEvent.change(description, { target: { value: "Test Description" } });

      await act(async () => {
        fireEvent.click(submitButton);
      });

      expect(axios.post).toHaveBeenCalledWith("/api/issues", {
        title: "Test Issue",
        description: "Test Description",
      });
    });
  });

  describe("Updating existing issue", () => {
    it("should render IssueForm elements with issue prop", () => {
      render(<IssueForm issue={mockIssue} />);

      const title = screen.getByPlaceholderText("Title") as HTMLInputElement;
      expect(title.value).toBe(mockIssue.title);

      const description = screen.getByPlaceholderText(
        "Description"
      ) as HTMLInputElement;
      expect(description.value).toBe(mockIssue.description);

      const updateButton = screen.getByText("Update Issue");
      expect(updateButton).toBeInTheDocument();
    });

    it("should call axios.patch when update button is clicked", async () => {
      (axios.patch as jest.Mock).mockResolvedValueOnce({});
      render(<IssueForm issue={mockIssue} />);

      const title = screen.getByPlaceholderText("Title") as HTMLInputElement;
      const description = screen.getByPlaceholderText(
        "Description"
      ) as HTMLInputElement;
      const updateButton = screen.getByText("Update Issue");

      await act(async () => {
        fireEvent.click(updateButton);
      });

      expect(axios.patch).toHaveBeenCalledWith(`/api/issues/${mockIssue.id}`, {
        title: title.value,
        description: description.value,
      });
    });
  });

  describe("Error handling", () => {
    it("should show error message when inputs are empty", async () => {
      render(<IssueForm />);

      const submitButton = screen.getByText("Submit New Issue");
      await act(async () => {
        fireEvent.click(submitButton);
      });
      const titleError = screen.queryByText("Title is required");
      const descriptionError = screen.queryByText("Required");

      expect(titleError).toBeInTheDocument();
      expect(descriptionError).toBeInTheDocument();
    });
  });
});

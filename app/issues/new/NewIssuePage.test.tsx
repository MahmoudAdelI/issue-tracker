import { render, screen } from "@testing-library/react";
import NewIssuePage from "./page";
import { Theme } from "@radix-ui/themes";
import { mockIssue } from "@/__mocks__/mockedIssue";
import prisma from "@/prisma/client";

describe("EditIssuePage", () => {
  (prisma.issue.findUnique as jest.Mock).mockResolvedValue(mockIssue);

  it("should render with issue values", async () => {
    render(
      <Theme>
        <NewIssuePage />
      </Theme>
    );

    const title = (await screen.findByPlaceholderText(
      "Title"
    )) as HTMLInputElement;
    expect(title).toBeInTheDocument();
    expect(title.value).toBe("");

    const description = (await screen.findByPlaceholderText(
      "Description"
    )) as HTMLInputElement;
    expect(description).toBeInTheDocument();
    expect(description.value).toBe("");

    const submitButton = await screen.findByText("Submit New Issue");
    expect(submitButton).toBeInTheDocument();
  });
});

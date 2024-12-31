import { render, screen } from "@testing-library/react";
import EditIssuePage from "./page";
import { Theme } from "@radix-ui/themes";
import { mockIssue } from "@/__mocks__/mockedIssue";
import prisma from "@/prisma/client";

const generateParams = async (params: { id: string }) => params;
const paramsID = { id: "1" };

describe("EditIssuePage", () => {
  const params = generateParams(paramsID);
  (prisma.issue.findUnique as jest.Mock).mockResolvedValue(mockIssue);

  it("should render with issue values", async () => {
    const page = await EditIssuePage({ params });
    render(<Theme>{page}</Theme>);

    const title = (await screen.findByPlaceholderText(
      "Title"
    )) as HTMLInputElement;
    expect(title).toBeInTheDocument();
    expect(title.value).toBe(mockIssue.title);

    const description = (await screen.findByPlaceholderText(
      "Description"
    )) as HTMLInputElement;
    expect(description).toBeInTheDocument();
    expect(description.value).toBe(mockIssue.description);

    const updateButton = await screen.findByText("Update Issue");
    expect(updateButton).toBeInTheDocument();
  });
});

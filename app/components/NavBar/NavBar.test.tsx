import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";
import { Theme } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

const MockNavBar = () => (
  <Theme>
    <NavBar />
  </Theme>
);

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    status: "authenticated",
    data: { user: { name: "Test User" } },
  })),
}));

describe("NavBar", () => {
  it("renders without crashing", () => {
    render(<MockNavBar />);
  });
  describe("NavLinks", () => {
    it("should render nav links", () => {
      render(<MockNavBar />);
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
      expect(screen.getByText("Issues")).toBeInTheDocument();
    });
  });
  describe("AuthStatus", () => {
    it("should render avatar when authenticated", () => {
      render(<MockNavBar />);
      expect(screen.getByTestId("avatar")).toBeInTheDocument();
    });
    it("should renders 'Log In'", () => {
      (useSession as jest.Mock).mockReturnValue({
        status: "unauthenticated",
        data: null,
      });
      render(<MockNavBar />);
      expect(screen.getByText("Log In")).toBeInTheDocument();
    });
  });
});

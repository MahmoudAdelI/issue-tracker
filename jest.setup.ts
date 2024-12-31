import "@testing-library/jest-dom";
import "./__mocks__/resize-observer";
// Mock next/navigation
jest.mock("next/navigation", () => require("./__mocks__/next-navigation"));
// Mock scrollIntoView function
window.HTMLElement.prototype.scrollIntoView = jest.fn();
// Mock axios
jest.mock("axios");
//mock useSession and getServerSession
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));
jest.mock("next-auth", () => ({
  getServerSession: jest.fn().mockResolvedValue({
    user: { name: "John Doe" },
  }),
}));

// mock the authOptions
jest.mock("@/app/auth/authOptions", () => ({
  __esModule: true,
  default: {
    adapter: jest.fn(),
    providers: [],
    session: { strategy: "jwt" },
  },
}));
// mock useQuery
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(),
}));
// mock prisma
jest.mock("@/prisma/client", () => ({
  issue: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
    groupBy: jest.fn(),
  },
}));
// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
// mock radix-ui
jest.mock("radix");

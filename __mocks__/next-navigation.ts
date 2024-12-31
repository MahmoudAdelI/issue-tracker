const useRouter = () => ({
  push: jest.fn(),
});

const useSearchParams = () => ({
  get: jest.fn(),
  set: jest.fn(),
});

const usePathname = jest.fn();
const notFound = jest.fn();
module.exports = {
  useRouter,
  useSearchParams,
  usePathname,
  notFound,
};

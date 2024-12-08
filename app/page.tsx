import Paginations from "./components/Pagination";
type SearchParams = {
  searchParams: Promise<{ page: string }>;
};
export default async function Home({ searchParams }: SearchParams) {
  const { page } = await searchParams;

  return <h1>helloo world</h1>;
}

import Paginations from "./components/Paginations";
type SearchParams = {
  searchParams: Promise<{ page: string }>;
};
export default async function Home({ searchParams }: SearchParams) {
  const { page } = await searchParams;

  return (
    <Paginations issuesCount={320} perPageIssues={10} currentPage={+page} />
  );
}

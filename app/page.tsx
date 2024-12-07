import Paginations from "./components/Paginations";

export default function Home() {
  return <Paginations issuesCount={100} perPageIssues={10} currentPage={2} />;
}

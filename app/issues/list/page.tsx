import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, SearchParams } from "./IssueTable";

type Props = {
  searchParams: Promise<SearchParams>;
};
export default async function IssuesPage({ searchParams }: Props) {
  const SearchParams = await searchParams;

  const validStatuses = Object.values(Status);
  const status = validStatuses.includes(SearchParams.status)
    ? SearchParams.status
    : undefined;
  const orderBy = columnNames.includes(SearchParams.orderBy)
    ? {
        [SearchParams.orderBy]: "asc",
      }
    : undefined;
  const currentPage = +SearchParams.page || 1;
  const perPageIssues = 5;
  const issuesCount = await prisma.issue.count({ where: { status } });
  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (currentPage - 1) * perPageIssues,
    take: perPageIssues,
  });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={SearchParams} issues={issues} />
      <Pagination
        issuesCount={issuesCount}
        perPageIssues={perPageIssues}
        currentPage={currentPage}
      />
    </Flex>
  );
}

export const dynamic = "force-dynamic"; //make the page dynamic instead of being an SSG page
export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

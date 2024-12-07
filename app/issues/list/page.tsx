import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { RiArrowUpSLine } from "react-icons/ri";

export const dynamic = "force-dynamic"; //make the page dynamic instead of being an SSG page

type Props = {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue }>;
};
export default async function IssuesPage({ searchParams }: Props) {
  const columns: {
    lable: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { lable: "Issue", value: "title" },
    { lable: "Status", value: "status", className: "hidden md:table-cell" },
    { lable: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];
  const SearchParams = await searchParams;

  const validStatuses = Object.values(Status);
  const status = validStatuses.includes(SearchParams.status)
    ? SearchParams.status
    : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(SearchParams.orderBy)
    ? {
        [SearchParams.orderBy]: "asc",
      }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
    orderBy: orderBy,
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: { ...SearchParams, orderBy: column.value },
                  }}
                >
                  {column.lable}
                </NextLink>
                {column.value === SearchParams.orderBy && (
                  <RiArrowUpSLine className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

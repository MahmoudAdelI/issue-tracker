import { IssueStatusBadge } from "@/app/components";
import { Table } from "@radix-ui/themes";
import { Link } from "@/app/components";
import { RiArrowUpSLine } from "react-icons/ri";
import NextLink from "next/link";
import { Status, Issue } from "@prisma/client";

export type SearchParams = {
  status: Status;
  orderBy: keyof Issue;
  page: string;
};

type Props = {
  searchParams: SearchParams;
  issues: Issue[];
};
export default function IssueTable({ searchParams, issues }: Props) {
  return (
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
                  query: { ...searchParams, orderBy: column.value },
                }}
              >
                {column.lable}
              </NextLink>
              {column.value === searchParams.orderBy && (
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
  );
}
const columns: {
  lable: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { lable: "Issue", value: "title" },
  { lable: "Status", value: "status", className: "hidden md:table-cell" },
  { lable: "Created", value: "createdAt", className: "hidden md:table-cell" },
];
export const columnNames = columns.map((column) => column.value);

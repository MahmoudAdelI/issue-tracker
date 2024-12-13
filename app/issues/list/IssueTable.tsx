import { IssueStatusBadge, Link } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import IssueTableHeader from "./IssueTableHeader";

export type SearchParams = {
  status: Status;
  orderBy: keyof Issue;
  page: string;
  order: "asc" | "desc";
};

type Props = {
  searchParams: SearchParams;
  issues: Issue[];
};
export default function IssueTable({ searchParams, issues }: Props) {
  return (
    <Table.Root variant="surface" layout="fixed">
      <IssueTableHeader searchParams={searchParams} />
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

"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";

export default function IssueStatusFilter() {
  const statuses: { lable: string; value: Status | "ALL" }[] = [
    { lable: "All", value: "ALL" },
    { lable: "Open", value: "OPEN" },
    { lable: "Closed", value: "CLOSED" },
    { lable: "In Progress", value: "IN_PROGRESS" },
  ];
  return (
    <Select.Root
      onValueChange={(value) => {
        const selectedStatus = value === "ALL" ? undefined : value; // test
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.lable} value={status.value}>
            {status.lable}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

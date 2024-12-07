"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function IssueStatusFilter() {
  const statuses: { lable: string; value: Status | "ALL" }[] = [
    { lable: "All", value: "ALL" },
    { lable: "Open", value: "OPEN" },
    { lable: "Closed", value: "CLOSED" },
    { lable: "In Progress", value: "IN_PROGRESS" },
  ];
  const router = useRouter();
  return (
    <Select.Root
      //filtering issues...
      onValueChange={(status) => {
        const selectedStatus = status === "ALL" ? undefined : status; // test
        const query = selectedStatus ? `?status=${selectedStatus}` : "";
        router.push("/issues/list" + query);
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

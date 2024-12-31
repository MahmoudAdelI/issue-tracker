"use client";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function IssueStatusSelect({ issue }: { issue: Issue }) {
  const router = useRouter();
  const selectStatus = async (status: Status) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        status,
      });
      router.refresh();
    } catch (error) {
      toast.error("Changes could not be saved");
    }
  };
  return (
    <>
      <Select.Root defaultValue={issue.status} onValueChange={selectStatus}>
        <Select.Trigger
          placeholder="Select status..."
          variant="surface"
          color="gray"
        />
        <Select.Content variant="soft">
          <Select.Group>
            <Select.Label>Current Status</Select.Label>
            {statusItems.map((item) => (
              <Select.Item key={item.label} value={item.value}>
                {item.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster position="bottom-left" />
    </>
  );
}
const statusItems: { label: string; value: Status }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

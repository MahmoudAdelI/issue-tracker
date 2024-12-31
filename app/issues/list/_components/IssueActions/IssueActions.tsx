import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "../IssueStatusFilter/IssueStatusFilter";

export default function IssueActions() {
  return (
    <Flex justify="between">
      <IssueStatusFilter />
      <Button variant="outline">
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
}

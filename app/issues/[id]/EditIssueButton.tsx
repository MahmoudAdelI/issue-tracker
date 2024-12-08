import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { FaPenToSquare } from "react-icons/fa6";

export default function EditIssueButton({ issueId }: { issueId: number }) {
  return (
    <Link href={`/issues/edit/${issueId}`} className="contents">
      <Button variant="outline">
        <FaPenToSquare />
        Edit Issue
      </Button>
    </Link>
  );
}

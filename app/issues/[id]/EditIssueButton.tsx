import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { FaPenToSquare } from "react-icons/fa6";

export default function EditIssueButton({issueId}:{issueId:number}) {
  return (
    <Button>
        <FaPenToSquare />
        <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </Button>
  )
}

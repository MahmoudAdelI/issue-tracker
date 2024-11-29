import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { FaPenToSquare } from "react-icons/fa6";

export default function EditIssueButton({id}:{id:string}) {
  return (
    <Button>
        <FaPenToSquare />
        <Link href={`/issues/${id}/edit`}>Edit Issue</Link>
    </Button>
  )
}

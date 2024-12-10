import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
type Props = {
  params: Promise<{ id: string }>;
};
const fetchUser = cache((userId: number) =>
  prisma.issue.findUnique({ where: { id: userId } })
);
export default async function IssueDetailPage({ params }: Props) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const issue = await fetchUser(+id);

  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
}
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await fetchUser(+id);

  return {
    title: issue?.title,
    description: "Details of issue - " + issue?.id,
  };
}

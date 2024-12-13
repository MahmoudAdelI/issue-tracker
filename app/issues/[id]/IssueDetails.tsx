import authOptions from "@/app/auth/authOptions";
import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import ReactMarkdown from "react-markdown";
import IssueStatusSelect from "./IssueStatusSelect";

export default async function IssueDetails({ issue }: { issue: Issue }) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex justify="between" align="center">
        <Box my="2">
          <Flex gap="3">
            <IssueStatusBadge status={issue.status} />
            <Text>{issue.createdAt.toDateString()}</Text>
          </Flex>
        </Box>
        {session && <IssueStatusSelect issue={issue} />}
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
}

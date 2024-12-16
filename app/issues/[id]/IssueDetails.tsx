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
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <Box my="2" className="mr-auto">
          <Flex gap="3">
            <IssueStatusBadge status={issue.status} />
            <Text>{issue.createdAt.toDateString()}</Text>
          </Flex>
        </Box>
        {session && (
          <Box className="ml-auto">
            <IssueStatusSelect issue={issue} />
          </Box>
        )}
      </div>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
}

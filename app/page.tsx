import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueChart from "./components/IssueChart/IssueChart";
import IssueSummary from "./components/IssueSummary/IssueSummary";
import LatestIssues from "./components/LatestIssues/LatestIssues";
export default async function Home() {
  const issueCounts = await prisma.issue.groupBy({
    by: ["status"],
    _count: {
      status: true,
    },
    where: {
      status: { in: [Status.OPEN, Status.CLOSED, Status.IN_PROGRESS] },
    },
  });
  const counts: Record<Status, number> = { OPEN: 0, IN_PROGRESS: 0, CLOSED: 0 };
  issueCounts.forEach((item) => {
    counts[item.status] = item._count.status;
  });
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary
          open={counts.OPEN}
          closed={counts.CLOSED}
          inProgress={counts.IN_PROGRESS}
        />
        <IssueChart
          open={counts.OPEN}
          closed={counts.CLOSED}
          inProgress={counts.IN_PROGRESS}
        />
      </Flex>
      <LatestIssues issues={issues} />
    </Grid>
  );
}
export const dynamic = "force-dynamic"; //make the page dynamic instead of being an SSG page

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};

import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import { Status } from "@prisma/client";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "./LatestIssues";
import { Metadata } from "next";
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
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};

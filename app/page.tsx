import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import { Status } from "@prisma/client";
import IssueChart from "./IssueChart";
export default async function Home() {
  // const open = await prisma.issue.count({ where: { status: "OPEN" } });
  // const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  // const inProgress = await prisma.issue.count({
  //   where: { status: "IN_PROGRESS" },
  // });
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
  console.log(counts);
  return (
    // <LatestIssues />
    // <IssueSummary
    //   open={counts.OPEN}
    //   closed={counts.CLOSED}
    //   inProgress={counts.IN_PROGRESS}
    // />
    <IssueChart
      open={counts.OPEN}
      closed={counts.CLOSED}
      inProgress={counts.IN_PROGRESS}
    />
  );
}

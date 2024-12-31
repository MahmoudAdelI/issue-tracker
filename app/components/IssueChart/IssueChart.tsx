"use client";

import { Card } from "@radix-ui/themes";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell,
  LineChart,
} from "recharts";

export type IssueChartProps = {
  open: number;
  inProgress: number;
  closed: number;
};

export default function IssueChart({
  open,
  inProgress,
  closed,
}: IssueChartProps) {
  const data = [
    { label: "Open", value: open },
    { label: "In-progress", value: inProgress },
    { label: "Closed", value: closed },
  ];

  return (
    <Card data-testid="chart">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          width={80}
          data={data}
          barSize={80}
          style={{ fill: "var(--accent-7)" }}
        >
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

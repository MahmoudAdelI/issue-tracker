"use client";
import { Card } from "@radix-ui/themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
type Props = {
  open: number;
  inProgress: number;
  closed: number;
};
export default function IssueChart({ open, inProgress, closed }: Props) {
  const data = [
    { label: "Open", value: open },
    { label: "In-progress", value: inProgress },
    { label: "Closed", value: closed },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={50}
          data={data}
          barSize={100}
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

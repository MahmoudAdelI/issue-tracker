"use client";
import { Issue } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import React, { useState } from "react";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import NextLink from "next/link";
import { SearchParams } from "./IssueTable";

export default function IssueTableHeader({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [order, setOrder] = useState<"asc" | "desc">(
    searchParams.order || "asc"
  );

  return (
    <Table.Header>
      <Table.Row>
        {columns.map((column) => {
          const isActive = column.value === searchParams.orderBy;
          const nextOrder = order === "asc" ? "desc" : "asc";

          const toggleOrder = () => {
            setOrder(nextOrder);
          };

          return (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                    order: nextOrder,
                  },
                }}
                onClick={toggleOrder}
                aria-label={`Sort by ${column.label}`}
              >
                {column.label}
                {isActive &&
                  (order === "asc" ? (
                    <RiArrowUpSLine className="inline ml-1 text-sm" />
                  ) : (
                    <RiArrowDownSLine className="inline ml-1 text-sm" />
                  ))}
              </NextLink>
            </Table.ColumnHeaderCell>
          );
        })}
      </Table.Row>
    </Table.Header>
  );
}

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

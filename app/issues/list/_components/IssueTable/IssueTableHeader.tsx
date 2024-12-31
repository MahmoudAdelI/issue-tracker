"use client";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { columns, SearchParams } from "./IssueTable";

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

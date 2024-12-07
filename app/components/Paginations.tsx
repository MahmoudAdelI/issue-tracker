"use client";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";

type Props = {
  issuesCount: number;
  perPageIssues: number;
  currentPage: number;
};
export default function Paginations({
  issuesCount,
  perPageIssues,
  currentPage,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageCount = Math.ceil(issuesCount / perPageIssues);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };
  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>

      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <HiOutlineChevronDoubleLeft />
      </Button>

      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <HiOutlineChevronLeft />
      </Button>

      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <HiOutlineChevronRight />
      </Button>

      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <HiOutlineChevronDoubleRight />
      </Button>
    </Flex>
  );
}

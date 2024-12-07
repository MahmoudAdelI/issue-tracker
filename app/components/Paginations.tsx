import { Button, Flex, Text } from "@radix-ui/themes";
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
  const pageCount = Math.ceil(issuesCount / perPageIssues);
  if (pageCount <= 1) return null;
  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button variant="soft" color="gray" disabled={currentPage === 1}>
        <HiOutlineChevronDoubleLeft />
      </Button>
      <Button variant="soft" color="gray" disabled={currentPage === 1}>
        <HiOutlineChevronLeft />
      </Button>
      <Button variant="soft" color="gray" disabled={currentPage === pageCount}>
        <HiOutlineChevronRight />
      </Button>
      <Button variant="soft" color="gray" disabled={currentPage === 1}>
        <HiOutlineChevronDoubleRight />
      </Button>
    </Flex>
  );
}

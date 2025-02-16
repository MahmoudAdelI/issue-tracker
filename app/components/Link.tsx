import NextLink from "next/link"
import { Link as RadixLink } from "@radix-ui/themes"
type Props = {
    href: string,
    children: string
;}
export default function Link({ href, children }: Props) {
  return (
    <NextLink href={href} passHref legacyBehavior>
        <RadixLink>{children}</RadixLink>
    </NextLink>
  )
}

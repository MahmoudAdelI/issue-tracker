'use client'
import {Skeleton} from '@/app/components'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FaBug } from "react-icons/fa";
import classnames from 'classnames';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import {useSession} from 'next-auth/react'
export default function NavBar() {
    
  return (
    <nav className='border-b mb-5 px-5 py-3'>
      <Container>
        <Flex justify='between'>

          <Flex gap='3' align='center'>
            <Link href='/'><FaBug /></Link>
            <NavLinks />
          </Flex>

          <AuthStatus />

        </Flex>
      </Container>
    </nav>
    
  )
}

function NavLinks() {
  const links = [
    {lable: 'Dashboard', href: '/'},
    {lable: 'Issues', href: '/issues/list'}
  ];
  const currentPath = usePathname();
  return (
    <ul className='flex gap-4'>
      {links.map(link =>
        <li key={link.href}>
          <Link 
            className={classnames({
              'nav-link': true,
              '!text-zinc-900': link.href === currentPath,
            })}
            href={link.href}>{link.lable}</Link>
        </li>
      )}
    </ul>
  )
}

function AuthStatus() {
  const { status, data:session } = useSession();
  if(status === 'loading') return <Skeleton width='3rem'/>;
  if(status === 'unauthenticated')
    return <Link href='/api/auth/signin' className='nav-link'>Log In</Link>;
  
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
          src={session?.user?.image!}
          fallback={session?.user?.name?.slice(0, 1)!}
          size='2'
          radius='full'
          className='cursor-pointer'
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size='2'>
              {session?.user?.email}
            </Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href='/api/auth/signout'>Log Out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}

'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FaBug } from "react-icons/fa";
import classnames from 'classnames';
import { Box, Container, Flex } from '@radix-ui/themes';
import {useSession} from 'next-auth/react'
export default function NavBar() {
    const links = [
        {lable: 'Dashboard', href: '/'},
        {lable: 'Issues', href: '/issues/list'}
    ];
    const currentPath = usePathname();
    const { status, data:session } = useSession();
  return (
    <nav className='border-b mb-5 px-5 py-3'>
      <Container>
        <Flex justify='between'>
          <Flex gap='3' align='center'>
            <Link href='/'><FaBug /></Link>
            <ul className='flex gap-4'>
                {links.map(link =>
                    <li key={link.href}>
                      <Link 
                        className={classnames({
                          'text-zinc-900': link.href === currentPath,
                          'text-zinc-500': link.href !== currentPath,
                          'hover:text-zinc-800 transition-colors': true,
                        })}
                        href={link.href}>{link.lable}</Link>
                    </li>
                )}
            </ul>
          </Flex>

          <Box>
            {status === 'authenticated' && (
              <Link href='/api/auth/signout'>Log Out</Link>
            )}

            {status === 'unauthenticated' && (
              <Link href='/api/auth/signin'>Log In</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
    
  )
}

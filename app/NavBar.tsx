'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FaBug } from "react-icons/fa";
import classnames from 'classnames';
import { Box } from '@radix-ui/themes';
import {useSession} from 'next-auth/react'
export default function NavBar() {
    const links = [
        {lable: 'Dashboard', href: '/'},
        {lable: 'Issues', href: '/issues/list'}
    ];
    const currentPath = usePathname();
    const { status, data:session } = useSession();
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href='/'><FaBug /></Link>
        <ul className='flex space-x-6'>
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
        <Box>
          {status === 'authenticated' && (
            <Link href='/api/auth/signout'>Log Out</Link>
          )
          }
          {status === 'unauthenticated' && (
            <Link href='/api/auth/signin'>Log In</Link>
          )
          }
        </Box>
    </nav>
    
  )
}

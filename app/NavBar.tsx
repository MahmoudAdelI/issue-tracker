'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';
import { FaBug } from "react-icons/fa";
import classnames from 'classnames';
export default function NavBar() {
    const links = [
        {lable: 'Dashboard', href: '/'},
        {lable: 'Issues', href: '/issues'}
    ];
    const currentPath = usePathname();
    console.log(currentPath);
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href='/'><FaBug /></Link>
        <ul className='flex space-x-6'>
            {links.map(link =>
                <Link 
                  key={link.href}
                  className={classnames({
                    'text-zinc-900': link.href === currentPath,
                    'text-zinc-500': link.href !== currentPath,
                    'hover:text-zinc-800 transition-colors': true,
                  })}
                  href={link.href}>{link.lable}</Link>
             )}
            
        </ul>
    </nav>
    
  )
}
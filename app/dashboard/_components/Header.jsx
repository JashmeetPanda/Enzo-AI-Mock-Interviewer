'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import page from '../questions/page'
import { useRouter } from 'next/navigation'

function Header() {
  const path = usePathname()
  const router = useRouter();

  return (
    <div className='flex p-4 items-center justify-between bg-[#4d4dff] text-white shadow-md border-b border-yellow-300/50'>
      <Image src={'/enzo.png'} width={150} height={160} alt='logo' />
      <ul className='hidden md:flex gap-6'>
        <li>
          <Link
            href='/dashboard'
            className={`hover:text-[#e0e0ed] hover:font-bold transition-all ${
              path === '/dashboard' ? 'font-bold' : ''
            }`}
          >
            Grill Now, Chill Later – Where Mock Interviews Get Real!
          </Link>
        </li>
        {/* <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer  ${path=='/dashboard/questions'&&'text-primary font-bold'}`}>Questions</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer  ${path=='/dashboard/upgrade'&&'text-primary font-bold'}`}>Upgrade</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer  ${path=='/dashboard/how'&&'text-primary font-bold'}`}>How it works?</li> */}
      </ul>
      <UserButton />
    </div>
  )
}

export default Header

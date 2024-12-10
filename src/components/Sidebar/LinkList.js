import Link from 'next/link'
import React from 'react'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { GiExpense } from "react-icons/gi";
import { CiDollar } from "react-icons/ci";
import { GrTransaction } from "react-icons/gr";

const LinkList = () => {
  return (
    <div className='flex items-center justify-between h-full pl-5 pr-0 text-xl font-bold text-[#d2d2d2]'>
        <Link href={'/dashboard'}><MdOutlineSpaceDashboard className=' w-[30px] h-[30px]'/></Link>
        <Link href={'/ink'}><CiDollar className=' w-[30px] h-[30px]'/></Link>
        <Link href={'/'}><GiExpense className=' w-[30px] h-[30px]'/></Link>
        <Link href={'/'}><GrTransaction className=' w-[30px] h-[30px]'/></Link>
    </div>
  )
} 

export default LinkList
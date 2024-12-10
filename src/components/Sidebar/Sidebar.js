import React from 'react'
import LinkList from './LinkList'

const Sidebar = () => {
  return (
    <div className='flex w-full h-20 p-4 bg-[#000]'>
        <div className=' w-[25%] h-full justify-start items-center flex'>
            <p className='text-2xl font-extrabold text-[#d2d2d2]'>Logo</p>
        </div>
        <div className=' w-[75%] h-full'>
            <LinkList/>
        </div>
    </div>
  )
}

export default Sidebar
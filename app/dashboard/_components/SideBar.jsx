"use client"
import React, { useContext } from 'react'
import logo from '../../../public/logo.svg'
import Image from 'next/image'
import { Button } from '../../../components/ui/button.jsx'
import { LayoutDashboard, Shield, UserCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Progress } from '../../../components/ui/progress'
import Link from 'next/link'
import { CourseCountContext } from '../../_context/CourseCountContext.jsx'

function SideBar() {

  const MenuList=[
    {
      name:'Dashboard',
      icon:LayoutDashboard,
      path:'/dashboard'
    },
    {
      name:'Upgrade',
      icon:Shield,
      path:'/dashboard/upgrade'
    },
    {
      name:'Profile',
      icon:UserCircle,
      path:'/dashboard/profile'
    }
  ]

  const {totalCourse,setTotalCourse}=useContext(CourseCountContext);
  const path = usePathname();

  return (
    <div className='h-screen shadow-md p-5`'>
        <div className='flex gap-2 items-center ml-[38.2px] mt-8'>
            <Image src={logo} width={35} height={35} alt='logo.svg'/>
            <h2 className='font-extrabold text-2xl'>Easy Study</h2>
        </div>

        <div className='mt-10'>
          <Link href={'/create'} className='w-full'>
          <Button className='w-52 h-12 rounded-lg ml-4 bg-[#2856DB]'>+ Create New</Button>
          </Link>

          
          <div className='mt-5'>
            {MenuList.map((menu,index)=>(
              <div key={index}
              className={`flex mt-3 gap-4 w-52 h-12 rounded-lg ml-4 items-center hover:bg-slate-200 cursor-pointer 
              ${path==menu.path&&'bg-slate-200'}`}>
                <menu.icon className="w-5 h-5 shrink-0 ml-8" />
                <h2 className="text-lg font-medium ">{menu.name}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className='border p-3 bg-slate-100 rounded-lg absolute bottom-10 ml-[15.2px] w-[87%] mb-1'>
          <h2 className='text-lg mb-2'>Available Credits : {(5-totalCourse)}</h2>
          <Progress value={(totalCourse/5)*100}/>
          <h2 className='text-sm'>{totalCourse} Out of 5 Credits Used</h2>

          <Link href={'/dashboard/upgrade'} className='text-[#2856DB] text-xs mt-3'>Upgrade to Create More</Link>
        </div>
    </div>
  )
}

export default SideBar
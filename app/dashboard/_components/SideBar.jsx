// "use client"
// import React, { useContext } from 'react'
// import logo from '../../../public/logo.svg'
// import Image from 'next/image'
// import { Button } from '../../../components/ui/button.jsx'
// import { LayoutDashboard, Shield, UserCircle } from 'lucide-react'
// import { usePathname } from 'next/navigation'
// import { Progress } from '../../../components/ui/progress'
// import Link from 'next/link'
// import { CourseCountContext } from '../../_context/CourseCountContext.jsx'

// function SideBar() {

//   const MenuList=[
//     {
//       name:'Dashboard',
//       icon:LayoutDashboard,
//       path:'/dashboard'
//     },
//     {
//       name:'Upgrade',
//       icon:Shield,
//       path:'/dashboard/upgrade'
//     },
//     {
//       name:'Profile',
//       icon:UserCircle,
//       path:'/dashboard/profile'
//     }
//   ]

//   const {totalCourse,setTotalCourse}=useContext(CourseCountContext);
//   const path = usePathname();

//   return (
//     <div className='h-screen shadow-md p-5`'>
//         <div className='flex gap-2 items-center ml-[38.2px] mt-8'>
//             <Image src={logo} width={35} height={35} alt='logo.svg'/>
//             <h2 className='font-extrabold text-2xl'>Easy Study</h2>
//         </div>

//         <div className='mt-10'>
//           <Link href={'/create'} className='w-full'>
//           <Button className='w-52 h-12 rounded-lg ml-4 bg-[#2856DB]'>+ Create New</Button>
//           </Link>

          
//           <div className='mt-5'>
//             {MenuList.map((menu,index)=>(
//               <Link href={menu.path} key={index}>
//               <div 
//               className={`flex mt-3 gap-4 w-52 h-12 rounded-lg ml-4 items-center hover:bg-slate-200 cursor-pointer 
//               ${path==menu.path&&'bg-slate-200'}`}>
//                 <menu.icon className="w-5 h-5 shrink-0 ml-8" />
//                 <h2 className="text-lg font-medium ">{menu.name}</h2>
//               </div>
//               </Link>
//             ))}
//           </div>
//         </div>

//         <div className='border p-3 bg-slate-100 rounded-lg absolute bottom-10 ml-[15.2px] w-[87%] mb-1'>
//           <h2 className='text-lg mb-2'>Available Credits : {(5-totalCourse)}</h2>
//           <Progress value={(totalCourse/5)*100}/>
//           <h2 className='text-sm'>{totalCourse} Out of 5 Credits Used</h2>

//           <Link href={'/dashboard/upgrade'} className='text-[#2856DB] text-xs mt-3'>Upgrade to Create More</Link>
//         </div>
//     </div>
//   )
// }

// export default SideBar

"use client"
import React, { useContext } from 'react'
import logo from '../../../public/logo.svg'
import Image from 'next/image'
import { Button } from '../../../components/ui/button.jsx'
import { HomeIcon, LayoutDashboard, Shield, UserCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Progress } from '../../../components/ui/progress'
import Link from 'next/link'
import { CourseCountContext } from '../../_context/CourseCountContext.jsx'

function SideBar() {

  const MenuList=[
    {
      name:'Home',
      icon:HomeIcon,
      path:'/'
    },
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
    <div className='h-full w-60 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 shadow-xl border-r border-slate-100 p-4 flex flex-col overflow-y-auto'>
        {/* Logo Section */}
        <div className='flex gap-2 items-center justify-center mt-6 mb-8'>
            <h2 className='font-extrabold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>AI-LMS</h2>
        </div>

        {/* Create New Button */}
        {/* <div className='mb-6'>
          <Link href={'/create'} className='w-full'>
            <Button className='w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'>
              + Create New
            </Button>
          </Link>
        </div> */}

        {/* Navigation Menu */}
        <div className='flex-1 space-y-3'>
          {MenuList.map((menu,index)=>(
            <Link href={menu.path} key={index} className='w-full' >
              <div className={`flex gap-3 w-full h-11 mb-2 rounded-xl items-center cursor-pointer transition-all duration-300 px-3
                ${path==menu.path 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-95' 
                  : 'hover:bg-white hover:shadow-md text-slate-700 hover:text-blue-600 border border-transparent hover:border-slate-200'
                }`}>
                <menu.icon className={`w-5 h-5 shrink-0 transition-colors duration-300 ${
                  path==menu.path 
                    ? 'text-white' 
                    : 'text-slate-500'
                }`} />
                <h2 className={`text-base font-medium transition-colors duration-300 ${
                  path==menu.path 
                    ? 'text-white' 
                    : 'text-slate-700'
                }`}>
                  {menu.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>

        {/* Credits Section */}
        <div className='bg-white/70 backdrop-blur-lg border border-slate-200 p-4 rounded-2xl shadow-xl mt-4'>
          <h2 className='text-base mb-2 font-semibold text-slate-800'>Available Credits: {(5-totalCourse)}</h2>
          <Progress value={(totalCourse/5)*100} className='mb-3 h-2'/>
          <h2 className='text-sm text-slate-600 mb-3'>{totalCourse} Out of 5 Credits Used</h2>

          <Link href={'/dashboard/upgrade'} className='block'>
            <Button variant='outline' className='w-full h-9 rounded-xl border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg transform hover:scale-105'>
              Upgrade to Create More
            </Button>
          </Link>
        </div>
    </div>
  )
}

export default SideBar
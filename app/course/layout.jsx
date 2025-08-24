// import React from 'react'
// import DashboardHeader from '../dashboard/_components/DashboardHeader'

// const CourseViewLayout = ({children}) => {
//   return (
//     <div>
//         <DashboardHeader/>
//         <div className='mx-10 md:mx-36 lg:px-60 mt-10'>
//             {children}
//         </div>

//     </div>
//   )
// }

// export default CourseViewLayout

'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import DashboardHeader from '../dashboard/_components/DashboardHeader'

const CourseViewLayout = ({children}) => {
  const pathname = usePathname()
  
  // Check if we're on the notes page
  const isNotesPage = pathname?.includes('/notes')
  
  return (
    <div>
      {/* Only show DashboardHeader if NOT on notes page */}
      {!isNotesPage && <DashboardHeader/>}
      
      <div className={isNotesPage ? '' : 'mx-10 md:mx-36 lg:px-60 mt-10'}>
        {children}
      </div>
    </div>
  )
}

export default CourseViewLayout
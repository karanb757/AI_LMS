// "use client"
// import React, { useContext, useEffect, useState } from 'react'
// import axios from 'axios'
// import { useUser } from '@clerk/nextjs'
// import CourseCardItem from './CourseCardItem'
// import { RefreshCw } from 'lucide-react'
// // import { CourseCountContext } from '@/app/_context/CourseCountContext'
// import { Button } from '../../../components/ui/button'

// const CourseList = () => {

//     const {user} = useUser();
//     const [courseList,setCourseList]=useState([]);
//     const [loading,setLoading]=useState(false);
//     // const [totalCourse,setTotalCourse]=useContext(CourseCountContext);
    
//     useEffect(()=>{
//         user&&GetCourseList();
//     },[user])

//     const GetCourseList = async()=>{
//         setLoading(true);
//         const result=await axios.post('/api/courses',
//             {createdBy:user?.primaryEmailAddress?.emailAddress})
//             console.log(result);
//             setCourseList(result.data.result);
//             setLoading(false);
//         //  setTotalCourse(result.data.result?.length)
//     }

//   return (
//     <div className='mt-10'>
//         <h2 className='font-bold text-2xl flex justify-between items-center'>Your Study Material
//             <Button variant='outline'
//             onClick={()=>{
//                 console.log("Refresh clicked!");
//                 GetCourseList();
//             }}
//             className='border-primary text-primary'>
//             <RefreshCw/>
//             </Button>
//         </h2>

//         <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5'>
//             {loading==false? courseList?.map((course,index)=>(
//                 <CourseCardItem course={course} key={index}/>
//             ))
//             :[1,2,3,4,5,6].map((item,index)=>(
//                 <div key={index} className='h-56 w-full bg-slate-200 rounded-lg animate-pulse'>
//                 </div>
//             ))
//         }
//         </div>
//     </div>
//   )

// }

// export default CourseList



"use client"
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import CourseCardItem from './CourseCardItem'
import { RefreshCw } from 'lucide-react'
import { Button } from '../../../components/ui/button'

const CourseList = () => {
    const {user} = useUser();
    const [courseList,setCourseList]=useState([]);
    const [loading,setLoading]=useState(false);
    
    useEffect(()=>{
        user&&GetCourseList();
    },[user])

    const GetCourseList = async()=>{
        setLoading(true);
        try {
            const result = await axios.post('/api/courses',
                {createdBy:user?.primaryEmailAddress?.emailAddress})
            setCourseList(result.data.result);
        } catch (error) {
            console.error("Error fetching course list:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='mt-10'>
            <h2 className='font-bold text-2xl flex justify-between items-center'>
                Your Study Material
                <Button variant='outline'
                onClick={GetCourseList}
                className='border-primary text-primary'>
                <RefreshCw/>
                </Button>
            </h2>

            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5'>
                {loading==false? courseList?.map((course,index)=>(
                    <CourseCardItem course={course} key={index}/>
                ))
                :[1,2,3,4,5,6].map((item,index)=>(
                    <div key={index} className='h-56 w-full bg-slate-200 rounded-lg animate-pulse'>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default CourseList
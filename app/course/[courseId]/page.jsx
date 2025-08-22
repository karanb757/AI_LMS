// "use client"
// import DashboardHeader from '../../../app/dashboard/_components/DashboardHeader.jsx';
// import axios from 'axios';
// import { useParams } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import CourseIntroCard from './_components/CourseIntroCard';
// // import StudyMaterialSection from './_components/StudyMaterialSection';
// // import ChapterList from './_components/ChapterList';


// const Course = () => {
//     const {courseId}=useParams();
//     const [course,setCourse]=useState();

//     useEffect(()=>{
//         GetCourse();
//     },[])

//     const GetCourse = async()=>{
//         const result = await axios.get('/api/courses?courseId='+courseId);
//         console.log(result);
//         setCourse(result.data.result);
//     }
//   return (
//     <div>
//         <DashboardHeader />

//         <div className='mx-10 md:mx-36 lg:px-60 mt-10'>
//             {/* course intro  */}
//             <CourseIntroCard course={course}/>

//             {/* STUDY MATERIAL OPTIONS  */}
//             {/* <StudyMaterialSection courseId={courseId} course={course}/> */}

//             {/* CHAPTER LIST */}
//             {/* <ChapterList course={course}/> */}
//         </div>
//     </div>
//   )
// }

// export default Course


"use client"
import DashboardHeader from '../../../app/dashboard/_components/DashboardHeader.jsx';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseIntroCard from './_components/CourseIntroCard';

const Course = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState();

    useEffect(() => {
        if (courseId) GetCourse();
    }, [courseId]);

    const GetCourse = async () => {
        try {
          console.log("Fetching course with ID:", courseId);
          const result = await axios.get('/api/courses?courseId=' + courseId);
          console.log("API returning:", JSON.stringify(result, null, 2));
          console.log("result.data:", result.data);
          console.log("result.data.result:", result.data?.result);
          setCourse(result.data?.result);
        } catch (error) {
          console.error("Error fetching course:", error);
        }
      };

    return (
        <div>
            <DashboardHeader />
            <div className='mx-10 md:mx-36 lg:px-60 mt-10'>
                {course ? (
                    <CourseIntroCard course={course} />
                ) : (
                    <p className='text-gray-500'>Loading course details...</p>
                )}
            </div>
        </div>
    );
}

export default Course;

import { Progress } from '../../../../components/ui/progress'
import Image from 'next/image'
import React from 'react'

const CourseIntroCard = ({course}) => {
  console.log('Course data:', course);
  
  return (
    <div className='flex gap-5 items-center p-5 border shadow-md rounded-lg'>
        <Image src={'/knowledge.png'} alt='other' width={70} height={70} />
        <div>
            <h2 className='font-bold text-2xl'>{course?.courseLayout.course_title}</h2>
            <p>{course?.courseLayout?.summary}</p>
            <Progress className='mt-3'/>

            <h2 className='mt-3 text-lg text-primary'>Total Chapter: {course?.courseLayout?.chapters?.length}</h2>
        </div>
    </div>
  )
}

export default CourseIntroCard
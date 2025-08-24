// "use client"
// import React, { useContext, useEffect, useState } from 'react'
// import axios from 'axios'
// import { useUser } from '@clerk/nextjs'
// import CourseCardItem from './CourseCardItem'
// import { RefreshCw } from 'lucide-react'
// import { Button } from '../../../components/ui/button'
// import { CourseCountContext } from '../../_context/CourseCountContext'

// const CourseList = () => {
//     const {user} = useUser();
//     const [courseList,setCourseList]=useState([]);
//     const [loading,setLoading]=useState(false);
//     const {totalCourse,setTotalCourse}=useContext(CourseCountContext);
    
//     useEffect(()=>{
//         user&&GetCourseList();
//     },[user])

//     const GetCourseList = async()=>{
//         setLoading(true);
//         try {
//             const result = await axios.post('/api/courses',
//                 {createdBy:user?.primaryEmailAddress?.emailAddress})
//             setCourseList(result.data.result);
//             setTotalCourse(result.data.result?.length);
//         } catch (error) {
//             console.error("Error fetching course list:", error);
//         } finally {
//             setLoading(false);

//         }
//     }

//     return (
//         <div className='mt-10'>
//             <h2 className='font-bold text-2xl flex justify-between items-center'>
//                 Your Study Material
//                 <Button variant='outline'
//                 onClick={GetCourseList}
//                 className='border-primary text-primary'>
//                 <RefreshCw/>
//                 </Button>
//             </h2>

//             <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5'>
//                 {loading==false? courseList?.map((course,index)=>(
//                     <CourseCardItem course={course} key={index}/>
//                 ))
//                 :[1,2,3,4,5,6].map((item,index)=>(
//                     <div key={index} className='h-56 w-full bg-slate-200 rounded-lg animate-pulse'>
//                     </div>
//                 ))
//             }
//             </div>
//         </div>
//     )
// }

// export default CourseList

"use client"
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import CourseCardItem from './CourseCardItem'
import { RefreshCw, Plus, BookOpen, TrendingUp, Zap } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { CourseCountContext } from '../../_context/CourseCountContext'
import Link from 'next/link'

export default function CourseList() {
    const {user} = useUser();
    const [courseList,setCourseList]=useState([]);
    const [loading,setLoading]=useState(false);
    const {totalCourse,setTotalCourse}=useContext(CourseCountContext);
    
    useEffect(()=>{
        user&&GetCourseList();
    },[user])

    const GetCourseList = async()=>{
        setLoading(true);
        try {
            const result = await axios.post('/api/courses',
                {createdBy:user?.primaryEmailAddress?.emailAddress})
            setCourseList(result.data.result);
            setTotalCourse(result.data.result?.length);
        } catch (error) {
            console.error("Error fetching course list:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='mt-12'>
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h2 className='font-bold text-3xl text-slate-800 mb-2'>
                        Your Study Materials
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Continue your learning journey with AI-powered courses
                    </p>
                </div>
                
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <Button 
                        variant='outline'
                        onClick={GetCourseList}
                        className='border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 rounded-xl px-4 py-2 font-semibold transition-all duration-300 hover:scale-105'
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                    </Button>
                    
                    <Link href="/create">
                        <Button className="bg-blue-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-6 py-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <Plus className="w-4 h-4 mr-2" />
                            Create New
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Course Grid */}
            {courseList?.length === 0 && !loading ? (
                // Empty State
                <div className="text-center py-16">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 border border-blue-100 max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <BookOpen className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">
                            Start Your Learning Journey
                        </h3>
                        <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                            Create your first AI-powered course and unlock personalized study materials, 
                            flashcards, and quizzes tailored to your learning goals.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                            <div className="flex items-center text-slate-600">
                                <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                                <span className="text-sm font-medium">AI-Generated Content</span>
                            </div>
                            <div className="flex items-center text-slate-600">
                                <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                                <span className="text-sm font-medium">Adaptive Learning</span>
                            </div>
                        </div>
                        
                        <Link href="/create">
                            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                <Plus className="w-5 h-5 mr-2" />
                                Create Your First Course
                            </Button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {loading ? (
                        // Loading Skeletons
                        Array.from({length: 6}, (_, index) => (
                            <div key={index} className='bg-white rounded-3xl p-6 shadow-lg border border-slate-100'>
                                <div className="animate-pulse">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 bg-slate-200 rounded-2xl"></div>
                                        <div className="w-20 h-6 bg-slate-200 rounded-full"></div>
                                    </div>
                                    <div className="w-3/4 h-6 bg-slate-200 rounded-lg mb-3"></div>
                                    <div className="w-full h-4 bg-slate-200 rounded mb-2"></div>
                                    <div className="w-2/3 h-4 bg-slate-200 rounded mb-4"></div>
                                    <div className="w-full h-2 bg-slate-200 rounded mb-4"></div>
                                    <div className="w-full h-10 bg-slate-200 rounded-xl"></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        // Course Cards
                        courseList?.map((course,index)=>(
                            <CourseCardItem course={course} key={index}/>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}
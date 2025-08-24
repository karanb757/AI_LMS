import WelcomeBanner from './_components/WelcomeBanner'
import CourseList from './_components/CourseList'
import React from 'react'

const Dashboard = () => {
    return (
        <div className="min-h-screen">
            <WelcomeBanner />
            <CourseList/>
        </div>
    )
}

export default Dashboard
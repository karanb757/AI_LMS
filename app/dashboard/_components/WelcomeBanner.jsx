"use client"
import { useUser } from '@clerk/nextjs'
import { Sparkles, TrendingUp, Target } from 'lucide-react'
import React from 'react'

export default function WelcomeBanner() {
    const {user} = useUser();

    return (
        <div className='mb-8 '>
            {/* Greeting Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 mb-4 shadow-sm">
                <Sparkles className="w-4 h-4 text-yellow-500 mr-2 animate-pulse" />
                <span className="text-slate-700 text-sm font-medium">Welcome back!</span>
            </div>
            
            <h1 className='font-bold text-3xl md:text-4xl lg:text-5xl text-slate-800 mb-3'>
                Hello, {user?.firstName || user?.fullName || 'there'}! 👋
            </h1>
            <p className='text-slate-600 text-lg md:text-xl leading-relaxed mb-6'>
                Ready to continue your learning journey? Let's create something amazing today.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4">
                <div className="flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm">
                    <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-slate-700 text-sm font-medium">Learning Streak</span>
                </div>
                <div className="flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm">
                    <Target className="w-5 h-5 text-yellow-500 mr-2" />
                    <span className="text-slate-700 text-sm font-medium">Goal Focused</span>
                </div>
            </div>
        </div>
    )
}
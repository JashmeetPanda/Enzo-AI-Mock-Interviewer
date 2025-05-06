import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'


function Dashboard() {
  return (
    <div className='p-10 bg-[#ececff] min-h-screen w-full'> {/* Updated background */}
      <h2 className='font-bold text-2xl text-[#3333cc]'>Dashboard</h2> {/* Updated title color */}
      <h2 className='text-gray-800'>Create and Start your AI Mock Interview</h2> {/* Improved text readability */}
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview/>
      </div>

      <InterviewList/>
    </div>
  )
}

export default Dashboard;

"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq, desc } from 'drizzle-orm'
import InterviewItemCard from './InterviewItemCard'

function InterviewList() {
  const { user } = useUser()
  const [interviewList, setInterviewList] = useState([])

  useEffect(() => {
    if (user) {
      GetInterviewList()
    }
  }, [user])

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(MockInterview.id))

    setInterviewList(result)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Your Previous Mock Interviews
      </h2>

      {interviewList.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No interviews found yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviewList.map((interview, index) => (
            <InterviewItemCard
              key={index}
              interview={interview}
              GetInterviewList={GetInterviewList}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default InterviewList

'use client'

import React, { useEffect, useState } from 'react'
import { eq } from 'drizzle-orm'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import Webcam from 'react-webcam'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import '@fontsource/poppins'

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null)
  const [webCamEnabled, setWebCamEnabled] = useState(false)

  useEffect(() => {
    GetInterviewDetails()
  }, [])

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId))
      setInterviewData(result[0] || {})
    } catch (error) {
      console.error('Error fetching interview data:', error)
    }
  }

  return (
    <>
      {/* Page Title */}
      <h2 className="font-bold text-4xl text-gray-900 text-center mb-3 animate-fade-in" style={{ fontFamily: 'Poppins' }}>
        Welcome to <span className="text-[#3A3AFF]">Enzo</span>
      </h2>

      {/* Main Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto bg-white p-10 rounded-lg shadow-lg">
        {/* Interview Details Section */}
        <div className="flex flex-col gap-6">
          {/* Job Information Box */}
          <div className="p-6 rounded-lg border bg-[#EEF2FF] shadow-md animate-slide-in">
            <h2 className="text-lg text-[#2A2A6F]">
              <strong>Job Role/Position: </strong>
              {interviewData?.jobPosition || 'N/A'}
            </h2>
            <h2 className="text-lg text-[#2A2A6F]">
              <strong>Job Description: </strong>
              {interviewData?.jobDesc || 'N/A'}
            </h2>
            <h2 className="text-lg text-[#2A2A6F]">
              <strong>Years of Experience: </strong>
              {interviewData?.jobExperience || 'N/A'}
            </h2>
          </div>

          {/* Important Information Box */}
          <div className="p-5 border rounded-lg bg-[#FFF5CC] border-[#ccb506] shadow-md animate-slide-in">
            <h2 className="flex gap-2 items-center font-semibold text-[#2A2A6F]">
              <Lightbulb className="text-[#3A3AFF]" /> Important Information
            </h2>
            <ul className="list-disc pl-5 mt-2 text-gray-700 text-sm space-y-2">
              <li>Enable Webcam and Microphone to start your interview.</li>
              <li>You will be asked <strong>5 questions</strong> to answer.</li>
              <li>At the end, you will receive a <strong>detailed report</strong>.</li>
              <li>Speak clearly and confidently; avoid rushing your answers.</li>
              <li>Use headphones for better audio clarity and minimal echo.</li>
              <li>Ensure a stable internet connection to avoid interruptions.</li>
              <li><strong>Note:</strong> We never record your video, and you can disable webcam access anytime.</li>
            </ul>
          </div>
        </div>

        {/* Webcam Section */}
        <div className="p-6 border rounded-lg bg-[#E6E6FF] shadow-md flex flex-col items-center space-y-6 w-full max-w-[500px] mx-auto">
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              className="rounded-lg border shadow-md"
              style={{ height: 300, width: 300 }}
            />
          ) : (
            <>
              {/* Webcam Placeholder */}
              <div className="p-10 bg-gray-200 rounded-lg border shadow-md flex items-center justify-center w-[450px] h-[350px]">
                <WebcamIcon className="h-32 w-32 text-gray-700" />
              </div>

              {/* Enable Webcam Button */}
              <Button
                onClick={() => setWebCamEnabled(true)}
                className="w-full px-6 py-6 rounded-md font-semibold shadow-lg bg-[#3A3AFF] text-white hover:bg-[#5A5AFF] transition-all duration-300"
              >
                Enable Webcam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Start Interview Button */}
      <div className="mt-5 text-center">
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button className="bg-[#3A3AFF] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-[#5A5AFF] transition-transform duration-300 hover:scale-105">
            Start Interview
          </Button>
        </Link>
      </div>
    </>
  )
}

export default Interview

'use client';
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import QuestionSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      const raw = result[0]?.jsonMockResp;
      let jsonMockResp = [];

      try {
        const parsed = JSON.parse(raw);
        jsonMockResp = Array.isArray(parsed) ? parsed : [];
      } catch (err) {
        console.error('Invalid JSON in jsonMockResp:', err);
      }

      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0]);
    } catch (error) {
      console.error('Error fetching interview data:', error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Question Display */}
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/* Webcam + Answer Recording */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>

      {/* Navigation Buttons */}
      {mockInterviewQuestion.length > 0 && (
        <div className="flex justify-end items-center mt-6 gap-4">
          {activeQuestionIndex > 0 && (
            <Button
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
            >
              Previous Question
            </Button>
          )}

          {activeQuestionIndex < mockInterviewQuestion.length - 1 && (
            <Button
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
            >
              Next Question
            </Button>
          )}

          {activeQuestionIndex === mockInterviewQuestion.length - 1 && (
            <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
              <Button className="bg-green-600 text-white hover:bg-green-700">
                End Interview
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default StartInterview;

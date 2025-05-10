"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema' 
import { eq } from 'drizzle-orm'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown, Star, MessageCircle, ThumbsUp, BookOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

function Feedback({ params }) {
  const [FeedbackList, setFeedbackList] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);

    // Calculate average rating
    const validRatings = result.filter(item => item.rating >= 1 && item.rating <= 5); // ratings between 1 and 5
    const totalRating = validRatings.reduce((sum, item) => sum + parseFloat(item.rating), 0); // Ensure ratings are parsed to float
    const average = validRatings.length > 0 ? totalRating / validRatings.length : 0;
    setAverageRating(average.toFixed(1)); // Set average with one decimal place
  };

  return (
    <div >
      {/* Container */}
      <div className="max-w-7xl">

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 text-center mb-10 border border-gray-100">
          <h1 className="text-5xl font-extrabold text-green-600 mb-3 animate-fade-in">🎉 Congratulations!</h1>
          <p className="text-2xl font-semibold text-gray-800">Your Personalized Interview Feedback</p>
          
          <p className="text-gray-600 mt-1">Scroll below for per-question analysis and feedback</p>
        </div>

        {/* Feedback Cards */}
        <div className="space-y-6">
          {FeedbackList.map((item, index) => (
            <Collapsible
              key={index}
              className="bg-white hover:shadow-2xl transition-all duration-300 rounded-2xl border border-gray-200 overflow-hidden hover:scale-[1.01]"
            >
              <CollapsibleTrigger className="text-lg font-semibold px-6 py-5 flex justify-between items-center w-full text-left hover:text-blue-700 transition-all duration-200">
                <span className="text-gray-800">{index + 1}. {item.question}</span>
                <ChevronsUpDown className="ml-2 w-5 h-5 text-gray-500" />
              </CollapsibleTrigger>

              <CollapsibleContent className="px-6 pb-6 pt-2 space-y-4 animate-fade-in">

                <div className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-green-50 p-3 rounded-xl border-l-4 border-green-500 shadow-sm">
                  <Star className="w-5 h-5 text-green-700" />
                  <span className="text-green-800 font-medium">Rating: <span className="font-normal">{item.rating || "—"}</span></span>
                </div>

                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-50 p-3 rounded-xl border-l-4 border-blue-500 shadow-sm">
                  <MessageCircle className="w-5 h-5 text-blue-700" />
                  <span className="text-blue-800 font-medium">Your Answer: <span className="font-normal">{item.userAnswer || "—"}</span></span>
                </div>

                {item.correctAnswer && (
                  <div className="flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-50 p-3 rounded-xl border-l-4 border-gray-600 shadow-sm">
                    <BookOpen className="w-5 h-5 text-gray-700" />
                    <span className="text-gray-800 font-medium">Suggested Answer: <span className="font-normal">{item.correctAnswer}</span></span>
                  </div>
                )}

                <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-yellow-50 p-3 rounded-xl border-l-4 border-yellow-500 shadow-sm">
                  <ThumbsUp className="w-5 h-5 text-yellow-700" />
                  <span className="text-yellow-800 font-medium">Feedback: <span className="font-normal">{item.feedback || "—"}</span></span>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        {/* Button */}
        <div className="mt-12 flex justify-center">
          <Button
            className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
            onClick={() => router.replace('/dashboard')}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;

"use client";

import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, User } from 'lucide-react';
import { toast } from "sonner"; // Add this at the top
import { chatSession } from '@/utils/GeminiAIModel';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';


function RecordAnswerSection({mockInterviewQuestion, activeQuestionIndex, interviewData}) {
  const [userAnswer, setUserAnswer] = useState('');
  const {user}=useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults

  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results.length > 0) {
      const latestTranscript = results[results.length - 1]?.transcript;
      if (latestTranscript) {
        setUserAnswer((prevAns) => prevAns + ' ' + latestTranscript);
      }
    }
  }, [results]);

  useEffect(() => {
    if(!isRecording && userAnswer?.trim().split(" ").length > 10){
      
      UpdateUserAnswer();
    }
  },[userAnswer])


  const StartStopRecording = async() => {
    if (isRecording) {
      
      stopSpeechToText();

  } else {
      startSpeechToText();
    }
  };
  
  const UpdateUserAnswer=async()=>{

    console.log("User Answer",userAnswer);
    setLoading(true);
    const feedbackPrompt = "Question:"+mockInterviewQuestion[activeQuestionIndex].question+" Answer: "+userAnswer+",Depends on question and answer for given interview question"+"Please give us rating for answerout of 5 and feedback as area of improvement if any"+"in just 2-3 lines to improve it in JSON format with rating field and feedback field"; 
      const result=await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp=(result.response.text()).replace(/```json|```/g, "").trim();
  
      console.log(mockJsonResp)
      const JsonFeedbackResp=JSON.parse(mockJsonResp);

     const resp = await db.insert(UserAnswer).values({
     mockIdRef: interviewData.mockId,
     question: mockInterviewQuestion[activeQuestionIndex]?.question,
     correctAnswer: mockInterviewQuestion[activeQuestionIndex]?.answer,
     userAnswer,
     feedback: JsonFeedbackResp.feedback,
     rating: JsonFeedbackResp.rating,
     userEmail: user?.primaryEmailAddress?.emailAddress,
     createdAt: new Date(), // ✅ Fix for timestamp issue
});

      
      if(resp){
        toast.success("Answer saved successfully!");
        setUserAnswer('');
        setResults([]);
      }
      setResults([]);
    
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 md:px-8">
      {/* Webcam Container with Style */}
      <div className="relative w-full max-w-lg rounded-3xl overflow-hidden border border-indigo-200 shadow-2xl bg-gradient-to-br from-white via-indigo-50 to-indigo-100 mb-10 transition-all duration-300">
        {/* Soft Placeholder Image */}
        <Image
          src="/webcam.png"
          width={400}
          height={300}
          alt="Webcam placeholder"
          className="absolute inset-0 opacity-10 object-cover w-full h-full z-0"
        />

        {/* Webcam Live Feed */}
        <div className="relative z-10">
          <Webcam
            mirrored
            className="w-full h-[300px] object-cover rounded-3xl"
          />
        </div>
      </div>

      {/* Record Button */}
      <button disabled={loading}
        onClick={StartStopRecording}
        className={`flex items-center gap-3 px-8 py-3 rounded-full font-semibold shadow-md transition-all duration-300 
          ${
            isRecording
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
      >
        <Mic className="w-5 h-5" />
        {isRecording ? 'Stop Recording' : 'Record Answer'}
      </button>

      {/* Show Answer Button */}
      
    </div>
  );
}

export default RecordAnswerSection;

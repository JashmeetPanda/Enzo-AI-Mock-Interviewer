import React from 'react'
import { Briefcase, CalendarDays, ClipboardList } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function InterviewItemCard({ interview }) {
    const router = useRouter()

    const onStart = () => {
        console.log("Navigating to interview start page");
        router.push(`/dashboard/interview/${interview?.mockId}`)
    }

    const onFeedback = () => {
        router.push(`/dashboard/interview/${interview.mockId}/feedback`)
    }

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            {/* Job Position */}
            <div className="flex items-center gap-3 mb-4">
                <Briefcase className="text-indigo-600 w-6 h-6" />
                <h3 className="text-xl font-semibold text-gray-800">{interview.jobPosition}</h3>
            </div>

            {/* Job Experience */}
            <div className="flex items-center gap-2 mb-3">
                <ClipboardList className="text-emerald-600 w-5 h-5" />
                <p className="text-sm text-gray-700 font-medium">Experience: 
                    <span className="ml-1 text-black font-semibold">{interview.jobExperience} years</span>
                </p>
            </div>

            {/* Job Description */}
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                {interview.jobDescription}
            </p>

            {/* Created Date */}
            <div className="flex items-center text-gray-500 text-sm mb-4">
                <CalendarDays className="w-4 h-4 mr-1 text-blue-600" />
                <span>Created on: {new Date(interview.createdAt).toLocaleDateString()}</span>
            </div>
            
            {/* Buttons */}
            <div className='flex flex-wrap justify-between gap-4 mt-4'>
                <Button 
                    size="sm" 
                    variant="outline"  
                    className="w-full sm:w-auto hover:bg-blue-600 hover:text-white bg-blue-300 transition-all"
                    onClick={onFeedback}
                >
                    Feedback
                </Button>
                
                <Button 
                    size="sm" 
                    className="w-full sm:w-auto bg-indigo-600 text-white hover:bg-indigo-700 transition-all"
                    onClick={onStart}
                >
                    Start
                </Button>
            </div>
        </div>
    )
}

export default InterviewItemCard;

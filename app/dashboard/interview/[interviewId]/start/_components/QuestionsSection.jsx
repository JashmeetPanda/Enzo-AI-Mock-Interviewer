import React from 'react';
import { Lightbulb, Volume2 } from 'lucide-react';

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex, setActiveQuestionIndex }) {

  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser doesn't support text to speech.");
    }
  };

  return mockInterviewQuestion && (
    <div className="p-6 rounded-2xl shadow-xl bg-white border border-gray-200 my-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {mockInterviewQuestion.map((_, index) => (
          <div
            key={index}
            onClick={() => setActiveQuestionIndex(index)}
            className={`text-sm font-medium px-4 py-2 rounded-full text-center cursor-pointer transition-all duration-300 shadow-sm 
              ${activeQuestionIndex === index ? 'bg-indigo-600 text-white scale-105' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            Question #{index + 1}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>
        <Volume2 
          className="w-6 h-6 text-indigo-600 cursor-pointer hover:scale-110 transition-transform" 
          onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)} 
        />
      </div>

      <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
        <div className="flex items-center gap-3 text-indigo-700 mb-3">
          <Lightbulb className="w-5 h-5" />
          <span className="font-semibold text-md">Interview Tips</span>
        </div>
        <ul className="list-disc pl-6 text-sm text-gray-700 space-y-2">
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
  );
}

export default QuestionsSection;

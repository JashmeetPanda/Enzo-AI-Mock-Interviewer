'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const handleRedirect = () => {
    window.location.href = "https://enzo-sand.vercel.app/dashboard";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1e99] via-[#4d4dff] to-[#a1a1ff] flex flex-col items-center justify-center text-white px-4">
      <Image src="/enzo.png" alt="Enzo Logo" width={180} height={180} className="mb-6 drop-shadow-lg" />

      <h1 className="text-5xl md:text-6xl font-extrabold text-center leading-tight mb-4">
        Ace Your Interviews <br />
        with <span className="text-yellow-300">AI-Powered Mock Sessions</span>
      </h1>

      <p className="text-lg md:text-xl text-center mb-8 max-w-2xl">
        Personalized mock interviews tailored to your job role, experience, and tech stack. Practice smarter, not harder.
      </p>

      <Button
        onClick={handleRedirect}
        className="bg-yellow-400 text-black font-semibold px-8 py-4 rounded-full text-lg hover:bg-yellow-300 transition-all"
      >
        Get Started
      </Button>

      <p className="mt-6 text-sm text-gray-200 opacity-75">
        Click and begin your mock interview journey now!
      </p>
    </div>
  );
}


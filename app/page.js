'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const handleRedirect = () => {
    window.location.href = "https://enzo-sand.vercel.app/dashboard";
  };

  return (
    <div>
      <h1>Start</h1>
      <Button onClick={handleRedirect}>Click</Button>
    </div>
  );
}

"use client";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const questionCount = parseInt(process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT) || 5;
    const experience = parseInt(jobExperience); // Handle 0 correctly

    const inputPrompt = `Job Position: ${jobPosition}, JD: ${jobDescription}, Years of Experience: ${experience}. Based on this, provide ${questionCount} interview questions with answers in JSON format.`;

    let MockJsonResp = "";

    try {
      const result = await chatSession.sendMessage(inputPrompt);
      const rawText = await result.response.text();
      MockJsonResp = rawText.replace(/```json|```/g, "").trim();

      const questions = JSON.parse(MockJsonResp);
      console.log(questions);
    } catch (error) {
      console.error("Error generating AI response:", error);
      MockJsonResp = "";
    } finally {
      if (MockJsonResp) {
        setJsonResponse(MockJsonResp);

        const resp = await db.insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: MockJsonResp,
            jobPosition: jobPosition,
            jobDesc: jobDescription,
            jobExperience: experience,
            createdBy: user?.primaryEmailAddress?.emailAddress
          })
          .returning({ mockId: MockInterview.mockId });

        if (resp) {
          setOpenDialog(false);
          router.push('/dashboard/interview/' + resp[0]?.mockId);
        }
      } else {
        console.log("Error: No response from AI");
      }

      setLoading(false);
    }
  };

  return (
    <div>
      {/* Trigger Card */}
      <div
        className="p-8 border rounded-2xl bg-[#4d4dff] flex items-center justify-center
          hover:scale-105 hover:shadow-lg cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-semibold text-center text-white">+ Add New</h2>
      </div>

      {/* Dialog Modal */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white max-w-2xl p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl mb-7">
              Tell us more about your Job Interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <div className="mb-5">
                    <label className="text-black font-semibold block mb-2">
                      Job Role / Position
                    </label>
                    <Input
                      className="text-black"
                      placeholder="Ex. Full Stack Developer"
                      required
                      value={jobPosition}
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>

                  <div className="mb-5">
                    <label className="text-black font-semibold block mb-2">
                      Job Description / Tech Stack
                    </label>
                    <Textarea
                      className="text-black"
                      placeholder="Ex. React, NodeJS, Angular, MySQL"
                      required
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>

                  <div className="mb-5">
                    <label className="text-black font-semibold block mb-2">
                      Years of Experience
                    </label>
                    <Input
                      className="text-black"
                      placeholder="Ex. 0"
                      type="number"
                      required
                      max="30"
                      value={jobExperience}
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-[#3A3AFF] text-white hover:bg-[#5A5AFF] transition-all flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating from AI...
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;

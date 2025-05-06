import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mock_interview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("json_mock_resp").notNull(),
  jobPosition: varchar("job_position", { length: 255 }).notNull(),
  jobDesc: varchar("job_desc", { length: 255 }).notNull(),
  jobExperience: varchar("job_experience", { length: 255 }).notNull(),
  createdBy: varchar("created_by", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  mockId: varchar("mock_id", { length: 255 }).notNull(),
})

export const UserAnswer=pgTable("user_answer", {
  id: serial("id").primaryKey(),
  mockIdRef:varchar("mock_id", { length: 255 }).notNull(),
  question: text("question").notNull(),
  correctAnswer: text("correct_answer"),
  userAnswer: text("user_answer"),
  feedback: text("feedback").notNull(),
  rating: varchar("rating", { length: 255 }).notNull(),
  userEmail: varchar("user_email", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

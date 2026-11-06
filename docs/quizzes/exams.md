---
title: How to add an exam lesson in RootWright LMS
description: "Add an Exam lesson in RootWright LMS: choose the Exam lesson type, add written-answer questions, and grade them yourself, since nothing is marked automatically."
plan: Free + Pro
tested_with: RootWright LMS 1.0.0 (Free), 1.0.0 (Pro)
last_verified: 2026-11-03
---

# How to add an exam lesson in RootWright LMS

An exam is a lesson where students answer written questions. Nothing in an exam is marked automatically. You read each answer and grade it yourself.

For quizzes that mark answers automatically, see [Create a quiz](/quizzes/create-a-quiz).

## Add an exam lesson

::: steps
1. Open the course in the course builder and click **Curriculum**.
2. Add a lesson, or open an existing one, and open it in the lesson builder.
3. Open **Lesson Type** and choose **Exam**.
:::

![The lesson builder with Exam selected as the lesson type](/images/quizzes/exams-01-lesson-type.jpg)

*The lesson builder for an exam lesson. **Lesson Type** reads **Exam**.*

An exam lesson starts with two blocks in its **Blocks** section: a **Quiz** block for automatically marked questions, and a **Question** block for written answers. Questions in the **Question** block use the answer type **Written answer**, which reads "Students write an answer. Nothing is marked automatically." 

## Add questions

::: steps
1. In the **Question** block, click **Add a question** and enter the question text.
2. Optional: write a model answer in the box below. It is for whoever marks the exam. Students never see it.
3. Set **Points** for the question. The default is 1.
4. Click **Add a question** to add another question.
5. Click **Save lesson**.
:::

A question that has no text shows **Needs a question** until you write one.

![An exam with two written-answer questions worth 5 points each](/images/quizzes/exams-02-written-questions.jpg)

*The **Question** block header totals the questions and points, here "2 questions · 10 pts". The first question has a model answer.*

## What the student sees

After submitting, the student sees **Submitted — awaiting review**, with their score so far. Questions that mark themselves, such as a rating scale, count straight away. The score goes up once you grade the written answers.

![The exam result a student sees while written answers wait for grading](/images/quizzes/exams-04-student-awaiting-review.jpg)

*The student's view after submitting. Here the score so far is 1 of 11.*

## Grade the answers

Written answers are not marked automatically. They wait for you in the grading queue.

::: steps
1. Go to **Teaching → Grading**. The **Teaching** tab and the **Grading** menu item show how many submissions are waiting.
2. On the **Waiting** tab, find the student's exam. Its status reads **Grading**.
3. Click **Grade** to open the attempt.
4. For each answer marked **Needs grading**, read the **Student's answer**, set the **Score** and, if you like, write **Feedback**.
5. Click **Save** under each answer.
:::

![The grading queue with one exam waiting](/images/quizzes/exams-03-grading-queue.jpg)

*Teaching → Grading. The queue lists the oldest submissions first. Filter by **All**, **Assignments** or **Quizzes**.*

![A quiz attempt open for grading](/images/quizzes/exams-05-grade-attempt.jpg)

*The attempt screen. The banner counts the answers that still need a grade, and **Go to the first** jumps to it. **Submission details** and **Questions** on the right show the student, the attempt and each question's status.*

Answers that were marked automatically show **Awarded** with an **Edit grade** button, in case you want to change the mark. Graded attempts move to the **Graded** tab.

## Related

- [Question types](/quizzes/question-types)
- [Grading and results](/quizzes/grading-and-results)
- [Create a quiz](/quizzes/create-a-quiz)

---
title: How to create a quiz in RootWright LMS
description: "Create a quiz in RootWright LMS: add a quiz lesson, write questions with answers, mark the correct answer, set points, and configure pass percentage and attempts."
plan: Free + Pro
tested_with: RootWright LMS 1.0.0 (Free), 1.0.0 (Pro)
last_verified: 2026-10-28
---

# How to create a quiz in RootWright LMS

A quiz is a lesson whose content is one or more questions. Create the quiz lesson in the course builder, add questions in the lesson's **Blocks** section, then set the pass percentage and attempts in the quiz settings.

## Before you start

- The course must exist. See [Add a course](/courses/add-a-course).
- Quizzes must be turned on. They are on by default under **Settings → Quizzes & assessments**.

## Create the quiz lesson

::: steps
1. In **Curriculum**, open a module and choose **Quiz** from the lesson type dropdown.
2. Type the quiz name and press **Enter**. The lesson builder opens with **Lesson Type** set to Quiz.
3. Open **Blocks** from the left menu.
:::

![The Blocks section with the Quiz block and Add a question](/images/quizzes/create-a-quiz-01-blocks.jpg)

*The Blocks section. The Quiz block holds the questions. Add-a-block buttons sit below it.*

## Add a question

::: steps
1. Click **Add a question**.
2. Type the question in **Write a question here**.
3. Click **Add answer** to add answers. Type each answer in its row.
4. Click the circle next to the correct answer. It shows **Correct**.
5. Set **Points** for the question, and optionally tick **Add to recall**.
:::

![A question with three answers, one marked Correct](/images/quizzes/create-a-quiz-02-question.jpg)

*Three answers. The first is marked Correct. The question type is Multiple choice, where students tick every option they think is right.*

If no answer is marked, the question shows "No correct answer marked" until you mark one.

## Quiz settings

Click **Settings** on the Quiz block. The settings apply to this quiz only, and fields marked with a dot override the site defaults.

![The Quiz Settings dialog](/images/quizzes/create-a-quiz-03-settings.jpg)

*Quiz Settings. Pass percentage defaults to 70.*

| Setting | Default | What it does |
|---|---|---|
| Points Per Question | 1 | Points for each correct answer. |
| Pass Percentage (%) | 70 | Minimum score to pass. In a course with a pass requirement, the course score needed is used instead. |
| Negative Marking (%) | 0 | Percentage of a question's points taken off for a wrong answer. 0 turns it off. |
| Questions Per Page | empty | 1, 2, 5 or 10 questions on screen at once. |
| Time Limit (Minutes) | 0 | Time limit for the whole quiz. 0 turns it off. |
| Question Display Order | Preserve Order | Preserve, Ascending, Descending or Randomized. |
| Attempts Allowed | 1 | How many times a student may try. 0 means unlimited. |
| Another try after a wait | On, 1 day | A wait before another attempt, in days, hours or minutes. |
| Show Feedback | After Submission | After Submission, Correct/Incorrect, No Feedback or On request. |
| Open-Ended Review | Review Required | Whether written answers need manual review. |

Click **Save Settings**, then **Save lesson**.

## Test it

Open the course as a student, or use a test account, and take the quiz. Check the score against the pass percentage. See [Grading and results](/quizzes/grading-and-results).

## Related

- [Question types](/quizzes/question-types).
- [Mastery percentage gating](/quizzes/mastery-gating).

/**
 * Release notes for /changelog. Newest first.
 * tag: 'New' | 'Improved' | 'Fixed' | 'Building'   ('Building' shows as "In progress")
 * status: 'Beta' | 'Stable' | 'Building'
 */
export type Tag = 'New' | 'Improved' | 'Fixed' | 'Building'

export interface ReleaseItem { tag: Tag; title: string; desc: string; pro?: boolean; link?: string }
export interface Release { version: string; date: string; status: 'Beta' | 'Stable' | 'Building'; summary: string; items: ReleaseItem[] }

export const releases: Release[] = [
  {
    version: 'Next up',
    date: 'In progress',
    status: 'Building',
    summary: 'What the team is working on right now. Subject to change.',
    items: [
      { tag: 'Building', title: 'LearnDash importer: more content types', desc: 'Courses import today. More of LearnDash is being mapped across, release by release.', link: '/integrations/learndash-importer' },
      { tag: 'Building', title: 'Pass the quiz, complete the lesson', desc: 'Passing a lesson’s quiz will mark the lesson complete.', link: '/learning/lesson-completion' },
      { tag: 'Building', title: 'Community plugin', desc: 'A companion plugin so your learners get a full community alongside their courses.' }
    ]
  },
  {
    version: '1.0 beta 1',
    date: 'Nov 1, 2026',
    status: 'Beta',
    summary: 'The first private beta. Round 1 testers get every Pro feature free while the beta runs.',
    items: [
      { tag: 'New', title: 'Student app', desc: 'A secure, focused app where students take their courses.', link: '/students/student-experience' },
      { tag: 'New', title: 'Reusable builder', desc: 'Build lessons from blocks you can reuse across courses.', link: '/courses/course-builder' },
      { tag: 'New', title: 'Checkpoints and quizzes', desc: 'Check understanding inside lessons, not just at the end.', link: '/quizzes/create-a-quiz' },
      { tag: 'New', title: 'Spaced recall', desc: 'Lessons come back at the right time, so students keep what they learn.', link: '/learning/daily-recall' },
      { tag: 'New', title: 'Dedicated tables', desc: 'Student data lives in its own tables, not scattered through post meta.' },
      { tag: 'New', title: 'Exams and study plans', desc: 'Proper exams, and schedules that keep students on pace.', pro: true, link: '/quizzes/exams' },
      { tag: 'New', title: 'Drip, payments and tax', desc: 'Release content over time and sell courses with tax handled.', pro: true },
      { tag: 'New', title: 'Watermarked video', desc: 'Discourage sharing of your paid lessons.', pro: true },
      { tag: 'New', title: 'AI course building', desc: 'Draft course outlines and lessons with AI, then edit them your way.', pro: true, link: '/courses/generate-with-ai' },
      { tag: 'New', title: 'FluentCRM and FluentCart', desc: 'Connect course activity to your CRM and sell through FluentCart.', link: '/integrations/fluentcrm' },
      { tag: 'Improved', title: 'LearnDash importer (early)', desc: 'Bring courses across from LearnDash. Not every LearnDash feature imports yet.', link: '/integrations/learndash-importer' }
    ]
  }
]

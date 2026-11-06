/** Content for the docs home page (docs/index.md → <DocsHome />). */

export const hero = {
  kicker: 'Updated for the 1.0 beta',
  kickerLink: '/changelog',
  titleBefore: 'What do you want to do in',
  titleMark: 'RootWright?',
  titleAfter: '',
  lead: 'Type it the way you’d say it. Search covers every guide, fix and developer reference, including everyday words like “sell”, “refund” or “import”.',
  searchHint: 'Try “students not getting emails”',
  popular: [
    { text: 'Sell a course', query: 'sell course' },
    { text: 'Import from LearnDash', query: 'learndash' },
    { text: 'Certificate rules', query: 'certificate rules' },
    { text: 'Students not getting email', query: 'email not received' },
    { text: 'REST API', query: 'rest api' }
  ]
}

/** Shown under "Something not working?". Links point at headings in help/troubleshooting.md. */
export const symptoms = [
  { text: 'Payments still say “test mode”', link: '/help/troubleshooting#payments-still-say-test-mode' },
  { text: 'Students do not get the welcome email', link: '/help/troubleshooting#students-do-not-get-the-welcome-email' },
  { text: '“Mark complete” does not update progress', link: '/help/troubleshooting#mark-complete-does-not-update-progress' },
  { text: 'A video will not upload', link: '/help/troubleshooting#a-video-will-not-upload' },
  { text: 'An admin screen is blank', link: '/help/troubleshooting#an-admin-screen-is-blank' },
  { text: 'Google connection fails on a local site', link: '/help/troubleshooting#google-connection-fails-on-a-local-site' }
]

export const quickStart = {
  title: 'Your first course',
  link: '/getting-started/first-course',
  steps: [
    { id: 'install', title: 'Install and activate', desc: 'Upload the plugin and run the setup wizard.', time: '3 min', link: '/getting-started/install-free' },
    { id: 'course', title: 'Create a course', desc: 'Name it, add a cover, pick who can enroll.', time: '5 min', link: '/courses/add-a-course' },
    { id: 'lessons', title: 'Add lessons and a quiz', desc: 'Build lessons, then check understanding.', time: '10 min', link: '/courses/course-builder' },
    { id: 'student', title: 'Enroll a test student', desc: 'See the course the way learners will.', time: '2 min', link: '/students/enroll-students' }
  ]
}

export const roles = [
  {
    id: 'admin', label: 'Site admin', icon: 'sliders',
    kicker: 'For site admins',
    title: 'Install, configure, and keep student data safe.',
    desc: 'Set up RootWright on your WordPress site, connect payments and email, and decide who can see what.',
    cta: { text: 'Start the admin guide', link: '/getting-started/install-free' },
    links: [
      { title: 'Requirements', desc: 'What your server and WordPress need.', link: '/getting-started/requirements' },
      { title: 'Setup wizard', desc: 'The first-run screen, step by step.', link: '/getting-started/setup-wizard' },
      { title: 'Activate your Pro license', desc: 'Unlock Pro features on your site.', link: '/getting-started/activate-license', pro: true },
      { title: 'Settings overview', desc: 'Every settings tab, field by field.', link: '/settings/overview' }
    ]
  },
  {
    id: 'instructor', label: 'Instructor', icon: 'edit',
    kicker: 'For instructors & coaches',
    title: 'Build courses students actually remember.',
    desc: 'Use the course builder, add quizzes, and let daily recall keep lessons fresh long after they’re done.',
    cta: { text: 'Build your first course', link: '/getting-started/first-course' },
    links: [
      { title: 'Course builder', desc: 'Lessons, sections and ordering.', link: '/courses/course-builder' },
      { title: 'Create a quiz', desc: 'Check understanding inside the course.', link: '/quizzes/create-a-quiz' },
      { title: 'Daily recall', desc: 'Bring lessons back at the right time.', link: '/learning/daily-recall' },
      { title: 'Conditional certificates', desc: 'Award certificates when the rules are met.', link: '/certificates/conditional-certificates' }
    ]
  },
  {
    id: 'student', label: 'Student', icon: 'cap',
    kicker: 'For students',
    title: 'Find your way around your courses.',
    desc: 'Your courses, your daily recall and your own recall questions — all in one place.',
    cta: { text: 'See what students see', link: '/students/student-experience' },
    links: [
      { title: 'What students see', desc: 'Dashboard and course player.', link: '/students/student-experience' },
      { title: 'Daily recall', desc: 'What to review today.', link: '/learning/daily-recall' },
      { title: 'My recall questions', desc: 'Write your own questions to review later.', link: '/learning/my-recall-questions' },
      { title: 'Study plan', desc: 'Stay on pace with a schedule.', link: '/learning/study-plan', pro: true }
    ]
  },
  {
    id: 'developer', label: 'Developer', icon: 'code',
    kicker: 'For developers',
    title: 'Extend RootWright your way.',
    desc: 'Work with the REST API, hooks and filters, templates, shortcodes and blocks.',
    cta: { text: 'Open the developer docs', link: '/developers/rest-api' },
    links: [
      { title: 'REST API reference', desc: 'Endpoints, authentication and examples.', link: '/developers/rest-api' },
      { title: 'Hooks and filters', desc: 'Run your code when learning happens.', link: '/developers/hooks-and-filters' },
      { title: 'Templates and overrides', desc: 'Change markup safely from your theme.', link: '/developers/templates' },
      { title: 'Shortcodes and blocks', desc: 'Place RootWright anywhere.', link: '/developers/shortcodes-and-blocks' }
    ]
  }
]

/** One line under each sidebar section on the home page. The cards themselves come from sidebar.ts. */
export const topicDesc: Record<string, string> = {
  '/getting-started/': 'Install, set up and publish your first course.',
  '/courses/': 'The course builder, settings and access.',
  '/learning/': 'Help students keep what they learn.',
  '/quizzes/': 'Assess properly and gate progress on mastery.',
  '/students/': 'Enrollment, progress and groups.',
  '/certificates/': 'Design them, set rules, hand them out.',
  '/ai/': 'Connect a provider and let AI write questions.',
  '/commerce/': 'Sell courses with Stripe and PayPal.',
  '/integrations/': 'Video, live classes, CRM and imports.',
  '/settings/': 'Every settings tab, field by field.',
  '/developers/': 'APIs, hooks, templates and blocks.',
  '/help/': 'Fixes for common problems, and the FAQ.'
}

export const learndash = {
  title: 'Coming from LearnDash?',
  text: 'The importer brings your courses across so you can try RootWright on real content. It’s still growing — check what moves over today before you switch.',
  links: [
    { icon: 'download', text: 'Run the LearnDash importer', link: '/integrations/learndash-importer' },
    { icon: 'file', text: 'What imports today (and what doesn’t yet)', link: '/integrations/learndash-importer#what-imports' },
    { icon: 'layers', text: 'Course builder basics', link: '/courses/course-builder' }
  ]
}

export const helpBand = {
  title: 'Still stuck?',
  accent: 'Help us break it.',
  text: 'We’re in beta. If a guide is wrong or a feature misbehaves, tell us — every report makes the next release better.'
}

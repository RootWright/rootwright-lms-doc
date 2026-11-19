/** Content for the docs home page (docs/index.md → <DocsHome />). Topic cards come from sidebar.ts. */

export const hero = {
  titleBefore: 'How can we',
  titleAccent: 'help?',
  lead: 'Guides for setting up, teaching, selling and extending RootWright.',
  searchHint: 'Search guides, e.g. “quiz” or “Stripe”'
}

/** Breadcrumb above the title: the marketing site's Library section. */
export const crumbs = [
  { text: 'Home', link: 'https://rootwrightlms.com' },
  { text: 'Library', link: '' }
]

/** One line under each sidebar section on the home page. */
export const topicDesc: Record<string, string> = {
  '/getting-started/': 'Install, set up and publish your first course.',
  '/migration/': 'Move courses and students from another LMS.',
  '/courses/': 'The course builder, settings and access.',
  '/learning/': 'Help students keep what they learn.',
  '/quizzes/': 'Assess properly and gate progress on mastery.',
  '/students/': 'Enrollment, progress and groups.',
  '/certificates/': 'Design them, set rules, hand them out.',
  '/ai/': 'Connect a provider and let AI write questions.',
  '/commerce/': 'Sell courses with Stripe and PayPal.',
  '/community/': 'Q&A, reviews, comments and announcements.',
  '/integrations/': 'Video, live classes, CRM and storage.',
  '/settings/': 'Every settings tab, field by field.',
  '/developers/': 'APIs, hooks, templates and blocks.',
  '/help/': 'Fixes for common problems, and the FAQ.'
}

/** "Most-read guides" list. */
export const popular = [
  { text: 'Install RootWright Free', link: '/getting-started/install-free' },
  { text: 'Your first course in 10 minutes', link: '/getting-started/first-course' },
  { text: 'Course builder', link: '/courses/course-builder' },
  { text: 'Migrate from another LMS', link: '/migration/migrate-to-rootwright' },
  { text: 'Daily recall', link: '/learning/daily-recall' },
  { text: 'Payment gateways', link: '/commerce/payment-gateways' },
  { text: 'REST API', link: '/developers/rest-api' },
  { text: 'Troubleshooting and FAQ', link: '/help/troubleshooting' }
]

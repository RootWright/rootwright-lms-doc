/**
 * The docs map. One source of truth for:
 *  - the sidebar (see config.ts)
 *  - breadcrumbs on every page (DocMeta.vue)
 *  - `npm run docs:stubs`, which creates a draft page for any link that has no .md file yet
 *
 * Add `pro: true` to show the Pro pill in the sidebar.
 * `icon` names come from theme/icons.ts.
 */

export interface DocLink {
  text: string
  link: string
  pro?: boolean
  description?: string
}

export interface DocSection {
  text: string
  icon: string
  base: string
  collapsed?: boolean
  items: DocLink[]
}

export const sections: DocSection[] = [
  {
    text: 'Getting started',
    icon: 'flag',
    base: '/getting-started/',
    items: [
      { text: 'What is RootWright LMS', link: 'what-is-rootwright' },
      { text: 'Requirements', link: 'requirements' },
      { text: 'Install RootWright Free', link: 'install-free' },
      { text: 'Install RootWright Pro', link: 'install-pro', pro: true },
      { text: 'Free and Pro together', link: 'free-and-pro' },
      { text: 'Activate your Pro license', link: 'activate-license', pro: true },
      { text: 'Setup wizard', link: 'setup-wizard' },
      { text: 'Your first course in 10 minutes', link: 'first-course' },
      { text: 'Admin dashboard tour', link: 'dashboard-tour' }
    ]
  },
  {
    text: 'Migration',
    icon: 'download',
    base: '/migration/',
    collapsed: true,
    items: [
      { text: 'Migrate from another LMS', link: 'migrate-to-rootwright' },
      { text: 'What gets migrated', link: 'what-gets-migrated' }
    ]
  },
  {
    text: 'Courses',
    icon: 'layers',
    base: '/courses/',
    items: [
      { text: 'The Courses screen', link: 'courses-screen' },
      { text: 'Add a course', link: 'add-a-course' },
      { text: 'Course builder', link: 'course-builder' },
      { text: 'Lessons and topics screens', link: 'lessons-and-topics' },
      { text: 'Marketing, listing and learning options', link: 'course-details-options' },
      { text: 'Course settings and access', link: 'course-settings' },
      { text: 'Co-instructors and course team', link: 'course-team', pro: true },
      { text: 'Generate a course with AI', link: 'generate-with-ai', pro: true },
      { text: 'Drip schedule', link: 'drip-schedule', pro: true },
      { text: 'Course categories', link: 'categories' },
      { text: 'Course tags', link: 'tags' },
      { text: 'The course page students see', link: 'course-page' },
      { text: 'Course page layout', link: 'course-page-layout' },
      { text: 'Duplicate, draft or delete', link: 'duplicate-draft-delete' }
    ]
  },
  {
    text: 'Lessons & learning tools',
    icon: 'recall',
    base: '/learning/',
    items: [
      { text: 'Lessons', link: 'lessons' },
      { text: 'Lesson completion', link: 'lesson-completion' },
      { text: 'Video questions', link: 'video-questions', pro: true },
      { text: 'Study plan', link: 'study-plan', pro: true },
      { text: 'Daily recall', link: 'daily-recall' },
      { text: 'My recall questions', link: 'my-recall-questions' },
      { text: 'Retention reports', link: 'retention-reports', pro: true }
    ]
  },
  {
    text: 'Quizzes & exams',
    icon: 'check',
    base: '/quizzes/',
    collapsed: true,
    items: [
      { text: 'Create a quiz', link: 'create-a-quiz' },
      { text: 'Question types', link: 'question-types' },
      { text: 'Assignments', link: 'assignments' },
      { text: 'Exam system', link: 'exams', pro: true },
      { text: 'Grading and results', link: 'grading-and-results' },
      { text: 'The Assessments screen', link: 'assessments' },
      { text: 'Mastery percentage gating', link: 'mastery-gating' },
      { text: 'Mock exams', link: 'mock-exams', pro: true }
    ]
  },
  {
    text: 'Students & enrollment',
    icon: 'users',
    base: '/students/',
    collapsed: true,
    items: [
      { text: 'Enroll students', link: 'enroll-students' },
      { text: 'Student profile and progress', link: 'student-progress' },
      { text: 'Import and enroll in bulk', link: 'groups' },
      { text: 'Instructors and publish requests', link: 'instructors' },
      { text: 'Instructor applications', link: 'instructor-applications' },
      { text: 'What students see', link: 'student-experience' },
      { text: 'The student dashboard', link: 'student-dashboard' }
    ]
  },
  {
    text: 'Certificates',
    icon: 'award',
    base: '/certificates/',
    collapsed: true,
    items: [
      { text: 'Certificate designs and studio', link: 'certificate-studio' },
      { text: 'Open Badges', link: 'open-badges', pro: true },
      { text: 'Conditional certificates', link: 'conditional-certificates' },
      { text: 'How students get certificates', link: 'student-certificates' },
      { text: 'Certificate sign-off', link: 'certificate-signoff', pro: true }
    ]
  },
  {
    text: 'AI features',
    icon: 'spark',
    base: '/ai/',
    collapsed: true,
    items: [
      { text: 'Connect your AI provider', link: 'connect-ai-provider', pro: true },
      { text: 'AI settings', link: 'ai-settings', pro: true },
      { text: 'Agent access (MCP)', link: 'agent-access', pro: true },
      { text: 'Roles and permissions', link: 'roles-and-permissions', pro: true },
      { text: 'AI skills', link: 'ai-skills', pro: true },
      { text: 'AI audit and AI chat', link: 'ai-audit-and-chat', pro: true },
      { text: 'AI-written recall questions', link: 'post-lesson-questions', pro: true }
    ]
  },
  {
    text: 'Commerce',
    icon: 'cart',
    base: '/commerce/',
    collapsed: true,
    items: [
      { text: 'Payment gateways: Stripe and PayPal', link: 'payment-gateways', pro: true },
      { text: 'Checkout, tax and access rules', link: 'checkout-and-tax', pro: true },
      { text: 'Orders and subscriptions', link: 'orders-and-subscriptions' },
      { text: 'Discounts and coupons', link: 'discounts' },
      { text: 'Course bundles', link: 'course-bundles', pro: true },
      { text: 'Invoices and transactions', link: 'invoices-and-transactions', pro: true }
    ]
  },
  {
    text: 'Community',
    icon: 'mail',
    base: '/community/',
    collapsed: true,
    items: [
      { text: 'Course reviews', link: 'reviews' },
      { text: 'Lesson comments', link: 'lesson-comments' },
      { text: 'Announcements', link: 'announcements' },
      { text: 'Course Q&A', link: 'qa', pro: true }
    ]
  },
  {
    text: 'Integrations',
    icon: 'plug',
    base: '/integrations/',
    collapsed: true,
    items: [
      { text: 'Video hosting and storage', link: 'video-storage', pro: true },
      { text: 'Bunny.net Storage', link: 'bunny-storage', pro: true },
      { text: 'Cloudflare R2', link: 'cloudflare-r2', pro: true },
      { text: 'Google Drive', link: 'google-drive', pro: true },
      { text: 'Bunny.net Stream', link: 'bunny-stream', pro: true },
      { text: 'Cloudflare Stream', link: 'cloudflare-stream', pro: true },
      { text: 'YouTube', link: 'youtube', pro: true },
      { text: 'Zoom', link: 'zoom', pro: true },
      { text: 'Google Meet', link: 'google-meet', pro: true },
      { text: 'FluentCRM', link: 'fluentcrm', pro: true },
      { text: 'FluentCart', link: 'fluentcart' }
    ]
  },
  {
    text: 'Settings',
    icon: 'sliders',
    base: '/settings/',
    collapsed: true,
    items: [
      { text: 'Settings overview', link: 'overview' },
      { text: 'Site & pages', link: 'site-and-pages' },
      { text: 'Currency & locale', link: 'currency-and-locale' },
      { text: 'Search & AI visibility', link: 'search-and-ai-visibility' },
      { text: 'Courses & lessons', link: 'courses-and-lessons' },
      { text: 'Quizzes & assessments', link: 'quizzes-and-assessments' },
      { text: 'Students', link: 'students' },
      { text: 'Emails', link: 'emails' },
      { text: 'Performance', link: 'performance' },
      { text: 'Privacy & security', link: 'privacy-and-security' }
    ]
  },
  {
    text: 'Developers',
    icon: 'code',
    base: '/developers/',
    collapsed: true,
    items: [
      { text: 'REST API reference', link: 'rest-api' },
      { text: 'Hooks and filters', link: 'hooks-and-filters' },
      { text: 'Templates and overrides', link: 'templates' },
      { text: 'Shortcodes and blocks', link: 'shortcodes-and-blocks' }
    ]
  },
  {
    text: 'Help',
    icon: 'buoy',
    base: '/help/',
    collapsed: true,
    items: [
      { text: 'Troubleshooting and FAQ', link: 'troubleshooting' }
    ]
  }
]

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

/** VitePress sidebar config built from `sections`. */
export function buildSidebar() {
  return sections.map((s) => ({
    text: `<span class="rw-gi rw-i-${s.icon}" aria-hidden="true"></span>${esc(s.text)}`,
    collapsed: s.collapsed ?? false,
    items: s.items.map((i) => ({
      text: esc(i.text) + (i.pro ? '<span class="rw-pill rw-pill-pro">Pro</span>' : ''),
      link: s.base + i.link
    }))
  }))
}

/** Plain-text sidebar (no HTML) for llms.txt. */
export function buildPlainSidebar() {
  return sections.map((s) => ({
    text: s.text,
    items: s.items.map((i) => ({ text: i.text + (i.pro ? ' (Pro)' : ''), link: s.base + i.link }))
  }))
}

/** Flat list: [{ section, text, link, pro }] — used for breadcrumbs. */
export const flatLinks = sections.flatMap((s) =>
  s.items.map((i) => ({ section: s.text, sectionLink: s.base + s.items[0].link, text: i.text, link: s.base + i.link, pro: !!i.pro }))
)

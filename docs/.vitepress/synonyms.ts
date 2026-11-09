/**
 * Words people type that aren't in a page's title or text, so search and the
 * sidebar filter still find the page ("sell a course" → Payment gateways).
 * Key: page link, or link#heading-id to attach the words to one section.
 * Read by local search (config.ts) and SidebarFilter.vue.
 */
export const synonyms: Record<string, string> = {
  '/getting-started/install-free': 'setup upload plugin zip activate download start',
  '/getting-started/install-pro': 'upgrade addon zip upload premium',
  '/getting-started/activate-license': 'license key unlock serial premium',
  '/getting-started/requirements': 'php version wordpress version server hosting minimum',
  '/getting-started/setup-wizard': 'onboarding first run configure',
  '/courses/add-a-course': 'create new course make',
  '/courses/course-builder': 'curriculum sections lessons order drag',
  '/courses/course-settings': 'access price private public visibility enrollment',
  '/courses/generate-with-ai': 'ai outline automatic chatgpt',
  '/learning/lesson-completion': 'mark complete progress finish',
  '/learning/study-plan': 'schedule calendar pace',
  '/learning/daily-recall': 'spaced repetition memory review flashcards remember',
  '/quizzes/create-a-quiz': 'test assessment questions',
  '/quizzes/question-types': 'multiple choice true false essay fill blank',
  '/quizzes/exams': 'timed exam final test',
  '/quizzes/mastery-gating': 'lock unlock prerequisite drip gate pass before next',
  '/quizzes/grading-and-results': 'score marks grade results attempts',
  '/students/enroll-students': 'add student give access manual enroll invite',
  '/students/groups': 'bulk csv cohort team company',
  '/students/student-progress': 'report track profile analytics',
  '/certificates/certificate-studio': 'design template certificate editor',
  '/certificates/conditional-certificates': 'rules criteria score pass requirement',
  '/certificates/student-certificates': 'download certificate pdf verify',
  '/ai/connect-ai-provider': 'openai claude gemini api key provider',
  '/commerce/payment-gateways': 'money sell paid stripe paypal pay charge price',
  '/commerce/checkout-and-tax': 'vat tax coupon checkout',
  '/commerce/orders-and-subscriptions': 'refund subscription order recurring membership',
  '/integrations/video-storage': 'video upload host mp4 storage',
  '/integrations/zoom': 'live class meeting webinar',
  '/integrations/google-meet': 'live class meeting webinar',
  '/migration/migrate-to-rootwright': 'import migrate move switch learndash tutor learnpress lifterlms masterstudy masteriyo academy',
  '/migration/what-gets-migrated': 'import migrate learndash tutor learnpress lifterlms masterstudy masteriyo academy groups certificates',
  '/integrations/fluentcrm': 'email marketing tags crm automation',
  '/integrations/fluentcart': 'sell cart shop store',
  '/developers/rest-api': 'api endpoints json authentication token',
  '/developers/hooks-and-filters': 'actions filters php customize hook',
  '/developers/templates': 'override theme template php',
  '/developers/shortcodes-and-blocks': 'gutenberg block shortcode embed elementor',
  '/help/troubleshooting#payments-still-say-test-mode': 'stripe paypal live sandbox payment not working',
  '/help/troubleshooting#google-connection-fails-on-a-local-site': 'google meet oauth localhost error',
  '/help/troubleshooting#mark-complete-does-not-update-progress': 'progress lesson complete stuck not working',
  '/help/troubleshooting#an-admin-screen-is-blank': 'white screen empty blank error not loading',
  '/help/troubleshooting#a-video-will-not-upload': 'video upload fail size error',
  '/help/troubleshooting#students-do-not-get-the-welcome-email': 'email smtp not received mail not sent'
}

/** Appends a page's (or one section's) synonyms to its rendered HTML for the search index only. */
export function withSynonyms(html: string, page: string): string {
  for (const [key, words] of Object.entries(synonyms)) {
    const [path, id] = key.split('#')
    if (path !== page) continue
    // Words go at the end of the section so the search preview still starts with real text.
    const start = id ? html.indexOf(`id="${id}"`) : 0
    if (start < 0) continue
    let end = html.indexOf('<h2', start + 1)
    if (end < 0) end = html.length
    html = html.slice(0, end) + `<p>${words}</p>` + html.slice(end)
  }
  return html
}

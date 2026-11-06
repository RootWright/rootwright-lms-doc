/** Site-wide settings for the custom theme. Edit freely. */
export const site = {
  /** Thin bar above the nav. Change `id` whenever the message changes so people who dismissed the old one see the new one. */
  banner: {
    enabled: true,
    id: 'docs-updating-1',
    text: 'We’re actively updating these docs. Found an issue? Let us know at',
    linkText: 'contact@rootwrightlms.com',
    link: 'mailto:contact@rootwrightlms.com'
  },

  /** Button at the right of the nav bar. */
  cta: { text: 'Get RootWright', link: 'https://rootwrightlms.com' },

  /** Version label shown in page meta and on the home page. */
  version: '1.0 beta',

  /**
   * "Was this page helpful?" — set to a URL that accepts a JSON POST
   * ({ page, helpful, note, version }) to collect answers. Empty = answers are only shown as thanks.
   */
  feedbackEndpoint: '',

  /** Help links used in the help band, footer and article sidebar. Leave a link empty to hide it. */
  help: {
    community: 'https://rootwrightlms.com',
    support: 'https://rootwrightlms.com',
    bugs: 'https://rootwrightlms.com'
  },

  /** Release-notes email form on the changelog page. Empty = form hidden. */
  newsletterAction: '',
  rss: ''
}

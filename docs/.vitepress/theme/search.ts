/** Opens VitePress's local search box, optionally pre-filled with a query. */
export function openSearch(query?: string) {
  if (typeof window === 'undefined') return
  if (query !== undefined) {
    try { sessionStorage.setItem('vitepress:local-search-filter', query) } catch {}
  }
  const btn = document.querySelector<HTMLButtonElement>('#local-search button')
  if (btn) btn.click()
  else window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true }))
}

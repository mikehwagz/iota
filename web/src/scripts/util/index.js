export function qs(selector, container = document) {
  return container.querySelector(selector)
}

export function qsa(selector, container = document) {
  return Array.from(container.querySelectorAll(selector))
}

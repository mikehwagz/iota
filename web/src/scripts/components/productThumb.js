import { component } from 'picoapp'
import choozy from 'choozy'
import { qs, on, add, remove, wrap, rect } from 'martha'

export default component((node, ctx) => {
  let { images, link } = choozy(node)
  let delay = 300
  let id = null
  let current = 1
  let el = null
  let isActive = false

  if (ctx.getState().ww < 850) {
    ctx.on('tick', ({ wh }) => {
      node.rect = rect(node)
      let threshold = wh * 0.5
      if (node.rect.top < threshold && node.rect.bottom > threshold) {
        activate()
      } else {
        deactivate()
      }
    })
  } else {
    let offEnter = on(link, 'mouseenter', activate)
    let offLeave = on(link, 'mouseleave', deactivate)

    return () => {
      id && clearTimeout(id)
      offEnter()
      offLeave()
    }
  }

  function activate() {
    if (isActive) return
    isActive = true

    step(current)

    el = qs(`.logo [data-index="${node.dataset.index}"]`)

    if (el) {
      remove(el, 'o0')
    }
  }

  function deactivate() {
    if (!isActive) return
    isActive = false

    id && clearTimeout(id)

    if (el) {
      add(el, 'o0')
    }
  }

  function step() {
    if (!images?.length) return

    images.forEach((image, index) => {
      add(image, 'o0')

      if (current === index) {
        remove(image, 'o0')
      }
    })

    current = wrap(current + 1, images.length)
    id = setTimeout(step, delay)
  }
})

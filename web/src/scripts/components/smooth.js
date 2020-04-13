import { component } from 'picoapp'
import { add, round, lerp } from '@selfaware/martha'

export default component((node, ctx) => {
  let sh = null
  let ty = 0
  let cy = 0
  let ease = 0.15
  let cache = []

  let stickyEls = Array.from(node.querySelectorAll('[data-sticky]'))

  add(node, 'fix', 'top', 'fill-x', 'oh')
  ctx.on('resize', resize)
  ctx.on('tick', update)

  function resize() {
    sh = node.getBoundingClientRect().height
    document.body.style.height = sh + 'px'

    cache = stickyEls.map((el) => {
      let container = el.closest('[data-sticky-container]') ?? document.body
      return {
        el,
        type: 'sticky',
        rect: {
          top: el.offsetTop,
          height: el.offsetHeight,
        },
        container: {
          el: container,
          rect: {
            top: container.offsetTop,
            height: container.offsetHeight,
          },
        },
      }
    })
  }

  function update() {
    ty = pageYOffset

    cy = round(lerp(cy, ty, ease), 100)

    let d = cy - ty
    if (d < 0) d *= -1
    if (d < 0.1) cy = ty

    node.style.transform = translateY(-cy)

    for (let i = 0; i < cache.length; i++) {
      let entry = cache[i]
      let { el, rect, container } = entry

      // track sticky el distance from top of viewport
      let top = rect.top - cy

      // scrolled beyond stick start
      if (top <= 0) {
        let bottom = container.rect.top + container.rect.height - cy

        if (bottom > rect.height) {
          el.style.transform = translateY(cy - rect.top)
        } else {
          el.style.transform = translateY(container.rect.height - rect.height)
        }
      } else {
        el.style.transform = null
      }
    }

    ctx.hydrate({ ty, cy, sh })
  }
})

function translateY(y) {
  return `translate3d(0, ${y}px, 0)`
}

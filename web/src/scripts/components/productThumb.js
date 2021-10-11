import { component } from 'picoapp'
import choozy from 'choozy'
import { on, add, remove, wrap } from 'martha'

export default component((node, ctx) => {
  let { images, link } = choozy(node)
  let delay = 300
  let id = null
  let current = 1

  let offEnter = on(link, 'mouseenter', () => {
    step(current)
  })

  let offLeave = on(link, 'mouseleave', () => {
    id && clearTimeout(id)
  })

  return () => {
    id && clearTimeout(id)
    offEnter()
    offLeave()
  }

  function step() {
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

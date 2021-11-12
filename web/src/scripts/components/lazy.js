import { on } from 'martha'
import { component } from 'picoapp'

export default component((node, ctx) => {
  const tmp = new Image()
  const src = node.dataset.src

  let off = on(tmp, 'load', () => {
    off()
    node.src = tmp.src
    node.removeAttribute('data-src')
  })

  tmp.src = src

  return () => {}
})

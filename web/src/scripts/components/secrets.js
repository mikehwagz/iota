import { component } from 'picoapp'
import { add, remove } from '@selfaware/martha'

export default component((node, ctx) => {
  const secrets = Array.from(node.children)

  ctx.on('dragStart', ({ index }) => {
    secrets.forEach((secret, i) =>
      i === index ? remove(secret, 'is-hidden') : add(secret, 'is-hidden'),
    )
  })
})

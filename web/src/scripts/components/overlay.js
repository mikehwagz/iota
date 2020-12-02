import { component } from 'picoapp'
import createPointerEvents from '@/lib/pointerEvents'
import { has, add, remove, index } from 'martha'

export default component((node, ctx) => {
  const pointerEvents = createPointerEvents({
    target: window,
    preventDefault: true,
  })

  ctx.on('resize', ({ ww }) => {
    ctx.emit('min', { min: ww < 650 ? 132 : 210 })

    ctx.emit('overlay:resize', {
      ow: node.offsetWidth,
      oh: node.offsetHeight,
    })
  })

  pointerEvents.on('down', ({ event, position: [x, y] }) => {
    let t = event.target

    if (has(t, 'js-letters')) {
      add(document.body, 'is-dragging')

      ctx.emit('dragStart', {
        index: index(t),
        sx: x,
        sy: y,
      })
    }
  })

  pointerEvents.on('move', ({ position: [x, y] }) => {
    const { index, sx, sy } = ctx.getState()

    if (index < 0) return

    ctx.emit('drag', {
      dx: index % 2 ? sx - x : x - sx,
      dy: index < 2 ? y - sy : sy - y,
    })
  })

  pointerEvents.on('up', () => {
    remove(document.body, 'is-dragging')

    ctx.emit('dragEnd', {
      dx: 0,
      dy: 0,
      index: -1,
    })
  })

  return () => {
    pointerEvents.disable()
  }
})

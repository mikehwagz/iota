import { component } from 'picoapp'
import { lerp, clamp, round } from '@selfaware/martha'

export default component((node, ctx) => {
  const inner = node.firstElementChild

  let tx = 1
  let ty = 1
  let cx = 1
  let cy = 1

  ctx.on('dragStart', ({ index }) => {
    if (index < 0) return

    node.style.transformOrigin = getTransformOrigin(index)
    inner.style.transformOrigin = getTransformOrigin(index)
  })

  ctx.on('drag', ({ dx, dy, ow, oh, min }) => {
    tx = clamp(1 - dx / ow, min / ow, 1)
    ty = clamp(1 - dy / oh, min / oh, 1)
  })

  ctx.on('dragEnd', () => {
    tx = ty = 1
  })

  ctx.on('tick', ({ ease }) => {
    cx = lerp(cx, tx, ease)
    let dx = cx - tx
    if (dx < 0) dx *= -1
    if (dx < 0.0001) cx = tx

    cy = lerp(cy, ty, ease)
    let dy = cy - ty
    if (dy < 0) dy *= -1
    if (dy < 0.0001) cy = ty

    let ncx = round(cx, 10000)
    let ncy = round(cy, 10000)
    let icx = round(1 / cx, 10000)
    let icy = round(1 / cy, 10000)

    node.style.transform = `scale(${ncx}, ${ncy})`
    inner.style.transform = `scale(${icx}, ${icy})`
  })

  return () => {}
})

function getTransformOrigin(i) {
  return `${i < 2 ? 'bottom' : 'top'} ${i % 2 ? 'left' : 'right'}`
}

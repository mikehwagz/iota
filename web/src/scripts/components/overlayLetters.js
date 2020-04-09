import { component } from 'picoapp'
import { has, remove, lerp, clamp, round } from '@selfaware/martha'

export default component((node, ctx) => {
  const letters = Array.from(node.children)

  let tx = 0
  let ty = 0
  let cx = 0
  let cy = 0
  let i = -1

  ctx.on('dragStart', ({ index }) => {
    i = index
  })

  ctx.on('drag', ({ dx, dy, ow, oh, min }) => {
    tx = clamp(dx, 0, ow - min)
    ty = clamp(dy, 0, oh - min)
  })

  ctx.on('dragEnd', () => {
    tx = 0
    ty = 0
  })

  ctx.on('tick', ({ ease }) => {
    if (i < 0) return

    cx = round(lerp(cx, tx, ease), 100)
    let dx = cx - tx
    if (dx < 0) dx *= -1
    if (dx < 0.001) cx = tx

    cy = round(lerp(cy, ty, ease), 100)
    let dy = cy - ty
    if (dy < 0) dy *= -1
    if (dy < 0.001) cy = ty

    let translateMap = [
      [2, 1, 3],
      [3, 0, 2],
      [0, 3, 1],
      [1, 2, 0],
    ]
    let [xi, yi, zi] = translateMap[i]
    let mxi = getMultipliers(xi)[0]
    let myi = getMultipliers(yi)[1]
    let [mx, my] = getMultipliers(i)

    letters[xi].style.transform = `translate3d(${mxi * cx}px, 0, 0)`
    letters[yi].style.transform = `translate3d(0, ${myi * cy}px, 0)`
    letters[zi].style.transform = `translate3d(0, 0, 0)`
    letters[i].style.transform = `translate3d(${mx * cx}px, ${my * cy}px, 0)`
  })
})

function getMultipliers(i) {
  return [i % 2 ? -1 : 1, i < 2 ? 1 : -1]
}

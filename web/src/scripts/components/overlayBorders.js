import { component } from 'picoapp'
import { clamp } from 'martha'
import rLerp from '@/util/rLerp'

export default component((node, ctx) => {
  let borders = Array.from(node.children)

  let ttx = 0
  let tty = 0
  let tcx = 0
  let tcy = 0

  let stx = 1
  let sty = 1
  let scx = 1
  let scy = 1

  let i = -1

  let translateMap = [
    [3, 0],
    [1, 0],
    [3, 2],
    [1, 2],
  ]

  let scaleMap = [
    [0, 3],
    [0, 1],
    [2, 3],
    [2, 1],
  ]

  ctx.on('dragStart', ({ index }) => {
    i = index

    let [x, y] = scaleMap[i]
    let [tox, toy] = getTransformOrigin(i)

    borders[x].style.transformOrigin = tox
    borders[y].style.transformOrigin = toy
  })

  ctx.on('drag', ({ dx, dy, ow, oh, min }) => {
    ttx = clamp(dx, 0, ow - min)
    tty = clamp(dy, 0, oh - min)

    stx = clamp(1 - dx / ow, min / ow, 1)
    sty = clamp(1 - dy / oh, min / oh, 1)
  })

  ctx.on('dragEnd', () => {
    ttx = tty = 0
    stx = sty = 1
  })

  ctx.on('tick', ({ ease }) => {
    if (i < 0) return

    tcx = rLerp(tcx, ttx, ease, 100, 0.001)
    tcy = rLerp(tcy, tty, ease, 100, 0.001)

    scx = rLerp(scx, stx, ease, 10000, 0.0001)
    scy = rLerp(scy, sty, ease, 10000, 0.0001)

    let [xi, yi] = translateMap[i]
    let [sxi, syi] = scaleMap[i]
    let mxi = getMultiplier(xi)
    let myi = getMultiplier(yi)

    for (let j = 0; j < borders.length; j++) {
      let transform = []
      let border = borders[j]

      if (j === xi) {
        transform.push(`translate3d(${mxi * tcx}px, 0, 0)`)
      } else if (j === yi) {
        transform.push(`translate3d(0, ${myi * tcy}px, 0)`)
      } else {
        transform.push(`translate3d(0, 0, 0)`)
      }

      if (j === sxi) {
        transform.push(`scaleX(${scx})`)
      } else if (j === syi) {
        transform.push(`scaleY(${scy})`)
      } else {
        transform.push(`scale(1)`)
      }

      border.style.transform = transform.join(' ')
    }
  })
})

function getMultiplier(i) {
  return [1, -1, -1, 1][i]
}

function getTransformOrigin(i) {
  return [i % 2 ? 'left' : 'right', i < 2 ? 'bottom' : 'top']
}

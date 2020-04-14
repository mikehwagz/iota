import { component } from 'picoapp'
import { lerp, clamp, round } from '@selfaware/martha'

export default component((node, ctx) => {
  const borders = Array.from(node.children)

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

    let scaleMap = [
      [0, 3],
      [0, 1],
      [2, 3],
      [2, 1],
    ]

    let [x, y] = scaleMap[i]
    let [tox, toy] = getTransformOrigin(i)

    borders[x].style.transformOrigin = tox
    borders[y].style.transformOrigin = toy

    // key: c (corner)
    //      b (border)
    //      # index
    // c0 ---- b0 ---- c1
    // -                -
    // b3              b1
    // -                -
    // c2 ---- b2 ---- c3

    // c0
    // b0 right
    // b3 bottom

    // c1
    // b0 left
    // b1 bottom

    // c2
    // b2 right
    // b3 top

    // c3
    // b2 left
    // b1 top
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

    tcx = round(lerp(tcx, ttx, ease), 100)
    let tdx = tcx - ttx
    if (tdx < 0) tdx *= -1
    if (tdx < 0.001) tcx = ttx

    tcy = round(lerp(tcy, tty, ease), 100)
    let tdy = tcy - tty
    if (tdy < 0) tdy *= -1
    if (tdy < 0.001) tcy = tty

    scx = round(lerp(scx, stx, ease), 10000)
    let sdx = scx - stx
    if (sdx < 0) sdx *= -1
    if (sdx < 0.0001) scx = stx

    scy = round(lerp(scy, sty, ease), 10000)
    let sdy = scy - sty
    if (sdy < 0) sdy *= -1
    if (sdy < 0.0001) scy = sty

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

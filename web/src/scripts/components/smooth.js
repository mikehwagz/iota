import { component } from 'picoapp'
import { qs, qsa, add, rect, round, lerp, clamp, remove } from 'martha'
import rLerp from '@/util/rLerp'

export default component((node, ctx) => {
  let sh = null
  let ty = 0
  let cy = 0
  let ease = 0.15
  let cache = []
  let hasClasses = true

  let inner = qs('[data-inner]', node)
  let stickyEls = qsa('[data-sticky]', node)

  // let prlxEls = qsa('[data-prlx]', node)

  ctx.on('resize', resize)
  ctx.on('tick', update)

  function resize({ ww, wh }) {
    if (ww >= 850) {
      if (!hasClasses) {
        remove(node, 'oy')
        hasClasses = true
      }

      sh = rect(inner).height
      document.body.style.height = sh + 'px'
      setCache()
    } else {
      if (hasClasses) {
        add(node, 'oy')
        hasClasses = false
      }

      document.body.removeAttribute('style')
    }
  }

  function setCache() {
    inner.style.transform = translateY(0)
    cache = stickyEls.map((el) => {
      el.style.transform = translateY(0)
      let container = el.closest('[data-sticky-container]') ?? document.body
      return {
        el,
        type: 'sticky',
        rect: rect(el),
        container: {
          el: container,
          rect: rect(container),
        },
      }
    })
    // .concat(
    //   prlxEls.map((el) => {
    //     el.style.transform = translateY(0)
    //     return {
    //       el,
    //       type: 'prlx',
    //       vars: JSON.parse(el.dataset.prlx),
    //       rect: rect(el),
    //       progress: {
    //         current: 0,
    //         target: 0,
    //       },
    //     }
    //   }),
    // )
  }

  function update({ ww }) {
    ty = pageYOffset

    cy = rLerp(cy, ty, ease, 100, 0.1)

    inner.style.transform = translateY(-cy)

    for (let i = 0; i < cache.length; i++) {
      let entry = cache[i]

      switch (entry.type) {
        case 'sticky':
          sticky({ ...entry, cy })
          break
        // case 'prlx':
        //   prlx({ ...entry, ty, wh, ease })
        //   break
        default:
          break
      }
    }

    if (ww >= 1200) {
      let fixedEls = qsa('[data-fixed]', node)

      for (let i = 0; i < fixedEls.length; i++) {
        let el = fixedEls[i]
        el.style.transform = translateY(cy)
      }
    }

    ctx.hydrate({ ty, cy, sh })
  }

  return () => {
    document.body.removeAttribute('style')
  }
})

function sticky({ el, rect, container, cy }) {
  // track distance from sticky el top to viewport top
  let top = rect.top - cy
  // scrolled beyond stick start
  if (top <= 0) {
    // track distance from sticky container bottom to viewport top
    let bottom = container.rect.top + container.rect.height - cy
    // container bottom is further from top of viewport than sticky el
    // so it's stuck!
    if (bottom > rect.height) {
      // counter translate the sticky el to stick
      el.style.transform = translateY(cy - rect.top)
    } else {
      // else element should stay right at the bottom
      // of the sticky container
      el.style.transform = translateY(container.rect.height - rect.height)
    }
  } else {
    // else remove transform
    el.style.transform = null
  }
}

// function prlx({ el, rect, vars, progress, ty, wh, ease }) {
//   progress.target = 1 - clamp((rect.bottom - ty) / (wh + rect.height), 0, 1)
//   progress.current = lerp(progress.current, progress.target, vars.ease ?? ease)

//   let keys = Object.keys(vars)
//   let transforms = []

//   for (let i = 0; i < keys.length; i++) {
//     let key = keys[i]
//     let val = vars[key]

//     val = Array.isArray(val) ? val : [key === 'scale' ? 1 : 0, val]

//     let [from, to] = val

//     switch (key) {
//       case 'scale':
//         transforms.push(
//           scale(round(from + progress.current * (to - from), 1000)),
//         )
//         break
//       case 'rotate':
//         transforms.push(
//           rotate(round(from + progress.current * (to - from), 100)),
//         )
//         break
//       case 'y':
//         transforms.push(
//           translateY(round(from + progress.current * (to - from), 100)),
//         )
//         break
//       default:
//         break
//     }

//     el.style.transform = transforms.join(' ')
//   }
// }

// function rotate(a) {
//   return `rotate(${a}deg)`
// }

// function scale(x) {
//   return `scale(${x})`
// }

function translateY(y) {
  return `translate3d(0, ${y}px, 0)`
}

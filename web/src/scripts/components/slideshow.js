import { component } from 'picoapp'
import choozy from 'choozy'
import { index, on, add, remove, wrap } from 'martha'
import signal from '../lib/signal'

export default component((node, ctx) => {
  let { slides, btns, next, prev, indicators } = choozy(node)

  let [idx, set] = signal(0, (idx) => {
    slides.forEach((slide, i) => {
      let indicator = indicators[i]
      if (i === idx) {
        remove(slide, 'dn')
        remove(indicator, 'o0')
      } else {
        add(slide, 'dn')
        add(indicator, 'o0')
      }
    })
  })

  let events = [
    on(prev, 'click', () => set(wrap(idx() - 1, btns.length))),
    on(next, 'click', () => set(wrap(idx() + 1, btns.length))),
    on(btns, 'click', (e) => set(index(e.currentTarget))),
  ]

  return () => events.map((off) => off())
})

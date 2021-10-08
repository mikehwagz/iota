import { component } from 'picoapp'
import choozy from 'choozy'
import { index, on, add, remove } from 'martha'

export default component((node, ctx) => {
  let { slides, btns, indicators } = choozy(node)

  on(btns, 'click', ({ currentTarget: t }) => {
    let selectedIndex = index(t)

    indicators.forEach((indicator, i) => {
      let slide = slides[i]

      if (i === selectedIndex) {
        remove(indicator, 'o0')
        remove(slide, 'dn')
      } else {
        add(indicator, 'o0')
        add(slide, 'dn')
      }
    })
  })
})

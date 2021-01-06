import smitter from 'smitter'
import { qsa, on } from 'martha'

export default function squeezebox(
  node,
  {
    multiple = false,
    collapsible = false,
    defaultIndex = null,
    resize = true,
  } = {},
) {
  let offResize = () => {}
  let uid = Date.now()
  let emitter = smitter()
  let events = []
  let select = (name) => qsa(`[data-squeezebox-${name}]`, node)
  let headers = select('header')
  let panels = select('panel')
  let inners = select('panel-inner')
  let items = headers.map((header, i) => ({
    index: i,
    header,
    panel: panels[i],
    inner: inners[i],
    expanded: i === defaultIndex,
  }))

  function resize() {
    items.forEach(({ panel, inner }) => {
      panel.style.maxHeight = inner.clientHeight + 'px'
    })
  }

  function expand(item) {
    let { header, panel } = item

    let off = on(panel, 'transitionend', () => {
      off()
      emitter.emit('expanded', item)
    })

    item.expanded = true
    header.setAttribute('aria-expanded', true)
    panel.removeAttribute('aria-hidden')

    emitter.emit('expand', item)
  }

  function collapse(item, initial) {
    let { header, panel } = item

    if (!initial) {
      let off = on(panel, 'transitionend', () => {
        off()
        emitter.emit('collapsed', item)
      })
    }

    item.expanded = false
    header.setAttribute('aria-expanded', false)
    panel.setAttribute('aria-hidden', true)

    !initial && emitter.emit('collapse', item)
  }

  function setup(item) {
    let { header, panel, expanded, index } = item

    header.setAttribute('aria-controls', `panel-${uid}-${index}`)
    header.setAttribute('id', `header-${uid}-${index}`)

    panel.setAttribute('role', 'region')
    panel.setAttribute('aria-labelledby', `header-${uid}-${index}`)
    panel.setAttribute('id', `panel-${uid}-${index}`)

    if (expanded) {
      expand(item)
    } else {
      collapse(item, true)
    }
  }

  return {
    on: emitter.on,
    resize,
    mount() {
      if (resize) {
        offResize = on(window, 'resize', resize)
        resize()
      }

      items.forEach((item, i) => {
        setup(item)

        let off = on(item.header, 'click', () => {
          let otherItems = removeIndexFromArray(items, i)

          if (!item.expanded) {
            expand(item)
            if (multiple) return
            otherItems.filter((item) => item.expanded).map(collapse)
          } else {
            collapsible && collapse(item)
          }
        })

        events.push(off)
      })
    },
    unmount() {
      offResize()
      events.map((off) => off())
    },
  }
}

function removeIndexFromArray(array, index) {
  const left = array.slice(0, index)
  const right = array.slice(index + 1)
  return left.concat(right)
}

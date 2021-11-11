import { component } from 'picoapp'
import squeezebox from '@/lib/squeezebox'

export default component((node, ctx) => {
  const accordion = squeezebox(node, {
    defaultIndex: 0,
    collapsible: true,
    resize: false,
  })

  ctx.on('resize', accordion.resize)
  accordion.mount()

  return () => {
    accordion.unmount()
  }
})

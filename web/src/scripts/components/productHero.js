import { component } from 'picoapp'
import { qsa } from 'martha'

export default component((node, ctx) => {
  const videos = qsa('video', node)

  if (videos.length) {
    ctx.on('enter:completed', () => {
      videos.forEach((video) => video.play())
    })
  }
})

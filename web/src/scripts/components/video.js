import { component } from 'picoapp'
import worker from 'workerize-loader!@/util/worker.js'

let instance = worker()

export default component((video, ctx) => {
  instance.loadVideo(video.dataset.src).then((objectURL) => {
    video.src = objectURL
    video.removeAttribute('data-src')

    ctx.on('paused', ({ paused }) => {
      if (paused) {
        video.pause()
      } else {
        video.play()
      }
    })
  })

  return () => {}
})

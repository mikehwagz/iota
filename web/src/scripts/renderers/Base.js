import Highway from '@dogstudio/highway'
import loadFonts from '@/lib/fontLoader'
import { on, remove, size } from '@selfaware/martha'
import gsap from 'gsap'
import app from '@/app'
import { initCheckout } from '@/util/shopify'

class Base extends Highway.Renderer {
  onFirstLoad() {
    // broadcast resize event
    on(window, 'resize', this.resize)

    // setup render loop
    gsap.ticker.add(this.tick)

    gsap.set('[data-router-view]', { autoAlpha: 1 })

    Promise.all([loadFonts(), initCheckout()]).then(() => {
      this.onEnter()
      remove(document.body, 'o0')
    })
  }

  onEnter() {
    this.mount()
  }

  onEnterCompleted() {}

  onLeave() {
    this.unmount()
  }

  onLeaveCompleted() {}

  resize = () => {
    app.emit('resize', size())
  }

  tick = () => {
    app.emit('tick')
  }

  mount = () => {
    app.mount()
    this.resize()
  }

  unmount = () => {
    app.unmount()
  }

  setup() {
    this.onFirstLoad()
  }
}

export default Base

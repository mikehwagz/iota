import Highway from '@dogstudio/highway'
import loadFonts from '@/lib/fontLoader'
import { on, remove, size } from 'martha'
import gsap from 'gsap'
import app from '@/app'
import { initCheckout } from '@/util/shopify'

import Instant from '@/transitions/Instant'
import ToDetail from '@/transitions/ToDetail'
import ToBag from '@/transitions/ToBag'

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
    this.onEnterCompleted()
  }

  onEnterCompleted() {
    app.emit('enter:completed')
  }

  onLeave() {
    this.unmount()
  }

  onLeaveCompleted() {}

  resize = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)

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

app.router = new Highway.Core({
  renderers: {
    default: Base,
  },
  transitions: {
    default: Instant,
    contextual: {
      toDetail: ToDetail,
      toBag: ToBag,
    },
  },
})

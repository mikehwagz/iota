import Highway from '@dogstudio/highway'
import gsap from 'gsap'

class Instant extends Highway.Transition {
  in({ from, to, done }) {
    window.scrollTo(0, 0)
    from.remove()
    gsap.set(to, { autoAlpha: 1 })
    done()
  }

  out({ from, done }) {
    done()
  }
}

export default Instant

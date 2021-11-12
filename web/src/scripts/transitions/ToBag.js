import Highway from '@dogstudio/highway'
import gsap from 'gsap'

class ToDetail extends Highway.Transition {
  in({ from, to, done }) {
    let tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'expo.inOut',
        duration: 1,
      },
      onComplete() {
        window.scrollTo(0, 0)
        from.remove()
        done()
      },
    })

    tl.set(to, {
      webkitClipPath: 'inset(0px 0px 100% 0px)',
      clipPath: 'inset(0px 0px 100% 0px)',
    })
      .set(to, { autoAlpha: 1 })
      .to(
        to,
        {
          webkitClipPath: 'inset(0px 0px 0px 0px)',
          clipPath: 'inset(0px 0px 0px 0px)',
        },
        0,
      )
      .restart()
  }

  out({ from, done }) {
    done()
  }
}

export default ToDetail

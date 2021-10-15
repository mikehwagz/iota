import Highway from '@dogstudio/highway'
import gsap from 'gsap'
import { qsa, rect } from 'martha'

class ToDetail extends Highway.Transition {
  in({ from, to, done }) {
    window.scrollTo(0, 0)

    let tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'expo.inOut',
        duration: 1,
      },
      onComplete() {
        from.remove()
        done()
      },
    })

    from.letters = qsa('.js-letters', from)
    to.letters = qsa('.js-letters', to)

    tl.to(
      '.js-logo',
      {
        webkitClipPath: 'inset(0px 0px 0px 0px)',
        clipPath: 'inset(0px 0px 0px 0px)',
      },
      'a',
    )

    from.letters.forEach((letter, i) => {
      let fromRect = rect(letter)
      let toRect = rect(to.letters[i])

      tl.to(
        letter,
        {
          x: toRect.x - fromRect.x,
          y: toRect.y - fromRect.y,
        },
        'a',
      )
    })

    tl.set(to, { autoAlpha: 1 }).restart()
  }

  out({ from, done }) {
    done()
  }
}

export default ToDetail

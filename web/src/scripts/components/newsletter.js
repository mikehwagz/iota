import { component } from 'picoapp'
import choozy from 'choozy'
import { on, add } from '@selfaware/martha'
import gsap from 'gsap'

export default component((node, ctx) => {
  let { form, message } = choozy(node)
  let isSubmitting = false

  let offSubmit = on(form, 'submit', (ev) => {
    ev.preventDefault()

    if (isSubmitting) return
    isSubmitting = true

    showLoader()

    fetch(
      'https://script.google.com/macros/s/AKfycbxJom_Zs3Qp9t4HrMIN8wtElCYRiNmvgJ3NTHJ492U8MACASMg/exec',
      {
        method: 'POST',
        body: new FormData(form),
      },
    )
      .then(() => {
        showMessage()
      })
      .catch(() => {
        message.textContent = message.dataset.error
        showMessage()
      })

    function showLoader() {
      add(form, 'o40', 'pen')
    }

    function showMessage() {
      gsap.to(form, {
        duration: 0.7,
        autoAlpha: 0,
        y: -10,
        ease: 'quint.inOut',
      })

      gsap.fromTo(
        message,
        { y: 10 },
        {
          duration: 0.7,
          autoAlpha: 1,
          y: 0,
          ease: 'quint.inOut',
        },
      )
    }
  })

  return () => {
    offSubmit()
  }
})

import { component } from 'picoapp'
import choozy from 'choozy'
import { on, add } from 'martha'
import gsap from 'gsap'
import { subscribe } from 'klaviyo-subscribe'

export default component((node, ctx) => {
  let { form, message } = choozy(node)
  let isSubmitting = false
  let klaviyoListId = 'WEpWxM'

  let offSubmit = on(form, 'submit', (ev) => {
    ev.preventDefault()

    if (isSubmitting) return
    isSubmitting = true

    showLoader()

    subscribe(klaviyoListId, form.email.value, {})
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

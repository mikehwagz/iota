import { component } from 'picoapp'
import choozy from 'choozy'
import { on, qs, remove, add } from 'martha'
import centsToPriceNoTrailingZeros from '@/util/centsToPriceNoTrailingZeros'
import { client, addItemToCheckout, openCheckout } from '@/util/shopify'
import { encode, decode } from 'shopify-gid'
import html from '@/util/html'
import delegate from '@/util/delegate'
import { router } from '@/index'

export default component((node, ctx) => {
  let refs = choozy(node)

  let headerLogo = qs('.js-headerLogo')
  let destinationWrapper = qs('.js-quickAddWrap')
  let changeEvents = []

  headerLogo.style.display = 'none'
  refs.quickAdd.remove()
  destinationWrapper.append(refs.quickAdd)
  remove(destinationWrapper, 'dn')
  add(destinationWrapper, 'db')

  let productId = node.dataset.id
  let shopifyId = encode('Product', productId, {
    accessToken: 'b906b8c00a63fd72aac3b15b19c83f7c',
  })

  let decodedVariants = []
  let selectedVariant = null

  client.product.fetch(shopifyId).then((product) => {
    product.variants.forEach((variant) => {
      decodedVariants.push({
        ...variant,
        cleanId: parseInt(decode(variant.id).id, 0),
      })
    })

    let firstAvailableVariant = decodedVariants.find((v) => v.available)
    selectedVariant = firstAvailableVariant || decodedVariants[0]

    if (refs.radios) {
      refs.radios.forEach((radio) => {
        if (parseInt(radio.value, 10) === selectedVariant.cleanId) {
          radio.setAttribute('checked', '')
        }
      })
    }

    setVariant()

    if (!product.availableForSale) {
      setSoldOut()
    }
  })

  if (refs.radios) {
    refs.radios.forEach((radio) => {
      let off = on(radio, 'change', (ev) => {
        ev.preventDefault()

        selectedVariant = decodedVariants.find(
          (v) => v.cleanId === parseInt(node.variant.value, 10),
        )

        setVariant()
      })

      changeEvents.push(off)
    })
  }

  let offSubmit = on(node, 'submit', async (ev) => {
    ev.preventDefault()
    setAdding()
    await addItemToCheckout(selectedVariant.id, 1)
    setAdded()
  })

  let offBagClick = delegate(document, '.js-bag', 'click', (el, ev) => {
    ev.preventDefault()
    router.redirect(window.location.origin + el.getAttribute('href'))
  })

  let offCheckout = delegate(document, '.js-checkout', 'click', () => {
    let newTab = false
    openCheckout(newTab)
  })

  ctx.on('resize', ({ ww }) => {
    if (ww < 650) {
      add(document.body, 'is-pdp')
    } else {
      remove(document.body, 'is-pdp')
    }
  })

  return () => {
    offSubmit()
    offBagClick()
    offCheckout()
    changeEvents.forEach((off) => off())
    headerLogo.removeAttribute('style')
    remove(destinationWrapper, 'db')
    add(destinationWrapper, 'dn')
    refs.quickAdd.remove()
    remove(document.body, 'is-pdp')
  }

  function setSoldOut() {
    refs.atc.forEach((btn) => {
      btn.textContent = 'Sold Out'
      btn.setAttribute('disabled', '')
    })
  }

  function setAdding() {
    refs.atc.forEach((btn) => {
      btn.textContent = 'Adding…'
      btn.setAttribute('disabled', '')
    })
  }

  function setAdded() {
    refs.atc.forEach((btn) => {
      if (btn.closest('form')) {
        btn.textContent = 'Add to Bag'
        btn.removeAttribute('disabled')
      } else {
        let parent = btn.parentNode
        parent.innerHTML = html`
          Added —
          <a class="btn btn--text mr5 js-bag" href="/bag">View Bag</a>
        `
      }
    })
  }

  function setVariant() {
    refs.price.forEach((el) => {
      el.textContent = centsToPriceNoTrailingZeros(selectedVariant.price)
    })

    if (selectedVariant.available) {
      refs.atc.forEach((btn) => {
        btn.textContent = 'Add to Bag'
        btn.removeAttribute('disabled')
      })
    } else {
      setSoldOut()
    }
  }
})
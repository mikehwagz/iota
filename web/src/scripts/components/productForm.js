import { component } from 'picoapp'
import { on, qsa } from '@selfaware/martha'
import { client, addItemToCheckout } from '@/util/shopify'
import { encode, decode } from 'shopify-gid'

export default component(async (node, ctx) => {
  let atcBtns = qsa('.js-atc')

  let productId = node.dataset.id
  let shopifyId = encode('Product', productId, {
    accessToken: 'b906b8c00a63fd72aac3b15b19c83f7c',
  })

  let product = await client.product.fetch(shopifyId)

  let decodedVariants = []
  product.variants.forEach((variant) => {
    decodedVariants.push({
      ...variant,
      cleanId: parseInt(decode(variant.id).id, 0),
    })
  })

  let firstAvailableVariant = decodedVariants.find((v) => v.available)
  let selectedVariant = firstAvailableVariant || decodedVariants[0]

  if (!product.availableForSale) {
    setSoldOut()
  }

  let offSubmit = on(node, 'submit', async (ev) => {
    ev.preventDefault()
    await addItemToCheckout(selectedVariant.id, 1)
  })

  return () => {
    offSubmit()
  }

  function setSoldOut() {
    atcBtns.forEach((btn) => {
      btn.textContent = 'Sold Out'
      btn.setAttribute('disabled', '')
    })
  }
})

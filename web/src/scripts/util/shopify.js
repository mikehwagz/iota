import ShopifyBuy from 'shopify-buy'
import app from '@/app'
import centsToPriceNoTrailingZeros from './centsToPriceNoTrailingZeros'

const SHOPIFY_CHECKOUT_STORAGE_KEY = 'shopify_checkout_id'

export const client = ShopifyBuy.buildClient({
  domain: 'shop.iota-editions.com',
  storefrontAccessToken: 'c31154779dab9b4c18557c2feb1f3d3d',
})

export function createNewCheckout() {
  return client.checkout.create()
}

export function fetchCheckout(id) {
  return client.checkout.fetch(id)
}

export function setCheckoutInState(checkout) {
  localStorage.setItem(SHOPIFY_CHECKOUT_STORAGE_KEY, checkout.id)
  app.hydrate({ checkout })
}

export async function initCheckout() {
  // Check for an existing cart in storage
  const existingCheckoutId = localStorage.getItem(SHOPIFY_CHECKOUT_STORAGE_KEY)

  if (existingCheckoutId) {
    try {
      const checkout = await fetchCheckout(existingCheckoutId)
      // Make sure this cart hasn’t already been purchased

      if (checkout.lineItems.some((lineItem) => !lineItem.variant)) {
        throw new Error(
          'Invalid line item in checkout. This variant was probably deleted from Shopify',
        )
      }

      if (!checkout.completedAt) {
        setCheckoutInState(checkout)
        return
      }
    } catch (e) {
      localStorage.setItem(SHOPIFY_CHECKOUT_STORAGE_KEY, null)
    }
  }

  const newCheckout = await createNewCheckout()
  setCheckoutInState(newCheckout)
}

export async function addItemToCheckout(variantId, quantity) {
  const checkoutId = app.getState().checkout.id
  const lineItemsToAdd = [{ variantId, quantity }]
  const newCheckout = await client.checkout.addLineItems(
    checkoutId,
    lineItemsToAdd,
  )

  app.emit(['bag:update', 'bag:add'], { checkout: newCheckout })
}

export async function removeItemFromCheckout(itemId) {
  const checkout = app.getState().checkout
  const checkoutId = checkout.id
  const item = checkout.lineItems.find((item) => item.id === itemId)
  const newCheckout = await client.checkout.removeLineItems(checkoutId, [
    itemId,
  ])

  app.emit('bag:update', { checkout: newCheckout })

  return item
}

export async function updateItemsFromCheckout(items) {
  items = [].concat(items)
  const checkoutId = app.getState().checkout.id
  const newCheckout = await client.checkout.updateLineItems(checkoutId, items)

  app.emit('bag:update', { checkout: newCheckout })
}

export async function incrementItemQuantityFromCheckout(itemId) {
  const checkout = app.getState().checkout
  const checkoutId = checkout.id
  const item = checkout.lineItems.find((item) => item.id === itemId)
  const newCheckout = await client.checkout.updateLineItems(checkoutId, [
    {
      id: itemId,
      quantity: item.quantity + 1,
    },
  ])

  app.emit('bag:update', { checkout: newCheckout })

  return item
}

export async function decrementItemQuantityFromCheckout(itemId) {
  const checkout = app.getState().checkout
  const checkoutId = checkout.id
  const item = checkout.lineItems.find((item) => item.id === itemId)
  const newCheckout = await client.checkout.updateLineItems(checkoutId, [
    {
      id: itemId,
      quantity: item.quantity - 1,
    },
  ])

  app.emit('bag:update', { checkout: newCheckout })

  return item
}

export function openCheckout(newTab) {
  let checkout = app.getState().checkout
  if (newTab) {
    window.open(checkout.webUrl)
  } else {
    window.location.href = checkout.webUrl
  }
}

export function decode(str) {
  const raw = str.split('shopify/')[1]

  const [type, id] = raw.split('/')

  const params = (id.split('?').slice(1)[0] || '').split('&').reduce((p, q) => {
    const [key, value] = q.split('=')
    p[key] = value
    return p
  }, {})

  return {
    type,
    id: id.split('?')[0],
    params,
    raw: str,
  }
}

export function encode(type, id, params = {}) {
  let full = `gid://shopify/${type}/${id}`

  let query = []
  const keys = Object.keys(params)

  if (keys.length > 0) {
    for (let i = 0; i < keys.length; i++) {
      query.push(keys[i] + '=' + params[keys[i]])
    }

    query = '?' + query.join('&')

    full += query
  }

  return full
}

export function formatPrice({ amount }, qty = 1) {
  const cents = parseInt(amount, 10) * 100
  return centsToPriceNoTrailingZeros(cents, qty)
}

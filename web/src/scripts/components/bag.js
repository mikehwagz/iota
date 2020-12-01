import { component } from 'picoapp'
import choozy from 'choozy'
import { qs, on, remove, add } from '@selfaware/martha'
import html from '@/util/html'
import delegate from '@/util/delegate'
import centsToPriceNoTrailingZeros from '@/util/centsToPriceNoTrailingZeros'

import {
  removeItemFromCheckout,
  incrementItemQuantityFromCheckout,
  decrementItemQuantityFromCheckout,
  openCheckout,
} from '@/util/shopify'

export default component((node, ctx) => {
  delegate(node, '.js-checkout', 'click', () => {
    let newTab = false
    openCheckout(newTab)
  })

  delegate(node, '.js-remove', 'click', async (el, ev) => {
    let li = el.closest('.js-lineItem')
    add(li, 'o65')
    await removeItemFromCheckout(el.dataset.id)
  })

  delegate(node, '.js-inc', 'click', async (el) => {
    let parent = el.parentNode
    add(parent, 'o65')
    await incrementItemQuantityFromCheckout(el.dataset.id)
    remove(parent, 'o65')
  })

  delegate(node, '.js-dec', 'click', async (el) => {
    let parent = el.parentNode
    add(parent, 'o65')
    await decrementItemQuantityFromCheckout(el.dataset.id)
    remove(parent, 'o65')
  })

  ctx.on('bag:update', render)
  render(ctx.getState())

  function render({ checkout }) {
    if (checkout.lineItems && checkout.lineItems.length) {
      let total = centsToPriceNoTrailingZeros(checkout.totalPrice)
      node.innerHTML = html`
        <div class="pt35 ph30">
          <div class="w70">
            <header class="pl40 mb40">
              <div class="bb bw1 bc-white df">
                <div class="w65 f28 lsn025em ttu lh100 pl25 pb15">Item</div>
                <div class="fg1 f28 lsn025em ttu lh100 pb15">Qty</div>
                <div class="f28 lsn025em ttu lh100 pr20 pb15">Price</div>
              </div>
            </header>
            <ul>
              ${checkout.lineItems
                .map((item, i) => {
                  return html`
                    <li
                      id="${item.id}"
                      class="line-item df aic mb35 js-lineItem"
                    >
                      <button
                        class="line-item__remove pr35 df aic js-remove"
                        data-id="${item.id}"
                        aria-label="Remove ${item.quantity > 1
                          ? 'items'
                          : 'item'} from Bag"
                      >
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 17 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            y="1.67871"
                            width="2.37397"
                            height="21.3657"
                            transform="rotate(-45 0 1.67871)"
                            fill="white"
                          />
                          <rect
                            x="1.67871"
                            y="16.7866"
                            width="2.37397"
                            height="21.3657"
                            transform="rotate(-135 1.67871 16.7866)"
                            fill="white"
                          />
                        </svg>
                      </button>
                      <div class="df aic w60">
                        <div class="w20">
                          <img
                            class="x"
                            src="${item.variant.image.src}"
                            alt="${item.variant.image.altText}"
                          />
                        </div>
                        <h4 class="pl50 fg1 f36 lsn025em">${item.title}</h4>
                      </div>
                      <div class="fg1">
                        <div class="qty-selector f36 lsn025em">
                          <button
                            class="ph5 js-dec"
                            data-id="${item.id}"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span>${item.quantity}</span>
                          <button
                            class="ph5 js-inc"
                            data-id="${item.id}"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <p class="f36 lsn025em pr20">
                        ${centsToPriceNoTrailingZeros(item.variant.price)}
                      </p>
                    </li>
                  `
                })
                .join('')}
            </ul>
            <footer class="pl40 mb40">
              <div class="bt bw1 bc-white df jcb">
                <div class="f36 lsn025em ttu lh100 pl25 pt25">Subtotal</div>
                <div class="f36 lsn025em ttu lh100 pr20 pt25">${total}</div>
              </div>
            </footer>
          </div>
          <div class="fix right bottom">
            <button
              class="btn btn--inverted serif f85 ba bc-white bw1 br50 ph30 pv35 js-checkout"
              style="transform: rotate(-31deg);"
            >
              Checkout
            </button>
          </div>
        </div>
      `
    } else {
      node.innerHTML = html`
        <div>Empty</div>
      `
    }
  }
})

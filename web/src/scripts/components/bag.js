import { component } from 'picoapp'
import { remove, add, size } from 'martha'
import html from '@/util/html'
import delegate from '@/util/delegate'
import centsToPriceNoTrailingZeros from '@/util/centsToPriceNoTrailingZeros'
import app from '@/app'

import {
  removeItemFromCheckout,
  incrementItemQuantityFromCheckout,
  decrementItemQuantityFromCheckout,
  openCheckout,
} from '@/util/shopify'

export default component((node, ctx) => {
  let offCheckoutClick = delegate(node, '.js-checkout', 'click', () => {
    let newTab = false
    openCheckout(newTab)
  })

  let offRemoveClick = delegate(node, '.js-remove', 'click', async (el, ev) => {
    let li = el.closest('.js-lineItem')
    add(li, 'o65')
    await removeItemFromCheckout(el.dataset.id)
    ctx.emit('resize', size())
  })

  let offIncrementClick = delegate(node, '.js-inc', 'click', async (el) => {
    let parent = el.parentNode
    add(parent, 'o65')
    await incrementItemQuantityFromCheckout(el.dataset.id)
    remove(parent, 'o65')
  })

  let offDecrementClick = delegate(node, '.js-dec', 'click', async (el) => {
    let parent = el.parentNode
    add(parent, 'o65')
    await decrementItemQuantityFromCheckout(el.dataset.id)
    ctx.emit('resize', size())
    remove(parent, 'o65')
  })

  let offShopClick = delegate(node, '.js-shop', 'click', (el, ev) => {
    ev.preventDefault()
    app.router.redirect(window.location.origin + el.getAttribute('href'))
  })

  ctx.on('bag:update', render)
  render(ctx.getState())

  function render({ checkout }) {
    if (checkout.lineItems && checkout.lineItems.length) {
      let total = centsToPriceNoTrailingZeros(checkout.totalPrice)
      node.innerHTML = html`
        <div class="pt35 pb200 ph20 s:ph30">
          <div class="x xl:w70">
            <header class="s:pl30 xl:pl40 mb15 m:mb25">
              <div class="bb bw1 bc-white df">
                <div
                  class="w70 s:w65 f18 s:f24 m:f28 lsn025em ttu lh100 s:pl15 l:pl25 pb15"
                >
                  Item
                </div>
                <div class="fg1 f18 s:f24 m:f28 lsn025em ttu lh100 pb15">
                  Qty
                </div>
                <div class="f18 s:f24 m:f28 lsn025em ttu lh100 l:pr20 pb15">
                  Price
                </div>
              </div>
            </header>
            <ul>
              ${checkout.lineItems
                .map((item, i) => {
                  return html`
                    <li
                      id="${item.id}"
                      class="line-item df aic mb15 m:mb20 js-lineItem"
                    >
                      <button
                        class="line-item__remove l:pr25 xl:pr35 dn s:df aic js-remove"
                        data-id="${item.id}"
                        aria-label="Remove ${item.quantity > 1
                          ? 'items'
                          : 'item'} from Bag"
                      >
                        <svg
                          class="db"
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
                        <svg
                          class="db s:dn"
                          width="10"
                          height="10"
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
                      <div class="df aic w70 s:w60">
                        <div class="dn l:db w20 fs0">
                          <div class="rel x" style="padding-top: 100%;">
                            ${item?.variant?.image?.src
                              ? html`
                                  <img
                                    class="abs fill x y o-contain"
                                    src="${item?.variant?.image?.src ?? ''}"
                                    alt="${item?.variant?.image?.altText ?? ''}"
                                  />
                                `
                              : ``}
                          </div>
                        </div>
                        <h4
                          class="s:pl25 xl:pl50 fg1 f18 s:f28 m:f36 l:pv20 lsn025em"
                        >
                          ${item.title}
                          ${item.variant.title !== 'Default Title'
                            ? ` / ${item.variant.title}`
                            : ''}
                        </h4>
                      </div>
                      <div class="fg1">
                        <div class="qty-selector f18 s:f28 m:f36 lsn025em">
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
                      <p class="f18 s:f28 m:f36 lsn025em l:pr20">
                        ${centsToPriceNoTrailingZeros(
                          item.variant.price,
                          item.quantity,
                        )}
                      </p>
                    </li>
                  `
                })
                .join('')}
            </ul>
            <footer class="s:pl30 xl:pl40 mb40">
              <div class="bt bw1 bc-white df jcb">
                <div
                  class="f18 s:f28 m:f36 lsn025em ttu lh100 s:pl15 l:pl25 pt25"
                >
                  Subtotal
                </div>
                <div class="f18 s:f28 m:f36 lsn025em ttu lh100 l:pr20 pt25">
                  ${total}
                </div>
              </div>
            </footer>
          </div>
          <div
            class="bag__checkout-wrap df jcc xl:db xl:fix right pl25 s:pl0"
            data-fixed
          >
            <button
              class="bag__checkout btn btn--inverted serif f55 s:f85 ba bc-white bw1 br50 js-checkout"
            >
              Checkout
            </button>
          </div>
        </div>
      `
    } else {
      node.innerHTML = html`
        <div class="pt40 ph20 s:ph30 l:df aib">
          <p class="f28 m:f36 l:f45 lsn025em mb40 mr20">
            Your bag is empty
          </p>
          <a
            class="btn btn--inverted serif ba bc-white bw1 br-full f28 m:f36 l:f45 lh120 js-shop"
            href="/"
            >Shop Now</a
          >
        </div>
      `
    }
  }

  return () => {
    offCheckoutClick()
    offRemoveClick()
    offIncrementClick()
    offDecrementClick()
    offShopClick()
  }
})

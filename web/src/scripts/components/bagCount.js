import { component } from 'picoapp'

export default component((node, ctx) => {
  ctx.on('bag:update', render)
  render(ctx.getState())

  function render({ checkout }) {
    let count = 0

    if (checkout.lineItems) {
      count = checkout.lineItems.reduce(
        (runningTotal, lineItem) => runningTotal + lineItem.quantity,
        0,
      )
    }
    node.textContent = count
  }
})

import { component } from 'picoapp'

export default component((node, ctx) => {
  console.log(ctx.getState())
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

    console.log(count)

    node.textContent = count
  }
})

import { component } from 'picoapp'

export default component((node, ctx) => {
  let p = node.firstElementChild
  let testEl = p.cloneNode(true)
  let tag = node.dataset.text
    .split(' ')
    .join('')
    .toUpperCase()
  node.appendChild(testEl)

  node.style.width = '102%'

  ctx.on('resize', resize)

  function resize({ ww, wh }) {
    let w = testEl.offsetWidth
    let h = testEl.offsetHeight
    let reps = Math.ceil((ww * 1.04) / w) * Math.ceil(wh / h)
    let repeated = testEl.textContent.trim().repeat(reps / 4)
    p.innerHTML = repeated + tag + repeated + tag + repeated + tag + repeated
  }

  return () => {}
})

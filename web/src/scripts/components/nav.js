import { component } from 'picoapp'
import choozy from 'choozy'
import { remove, add } from 'martha'
import app from '@/app'

export default component((node, ctx) => {
  const { links } = choozy(node)

  update({ location: window.location })

  app.router.on('NAVIGATE_IN', update)

  function update({ location }) {
    remove(links, 'is-active')

    links.forEach((link) => {
      if (link.getAttribute('href') === location.pathname) {
        add(link, 'is-active')
      }
    })
  }
})

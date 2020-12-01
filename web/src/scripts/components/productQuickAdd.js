import { component } from 'picoapp'
import choozy from 'choozy'
import { add, remove, qs } from '@selfaware/martha'

export default component((node, ctx) => {
  let headerLogo = qs('.js-headerLogo')
  let destinationWrapper = qs('.js-productQuickAdd')

  remove(headerLogo, 'dib')
  add(headerLogo, 'dn')
  node.remove()
  destinationWrapper.append(node)
  remove(destinationWrapper, 'dn')
  add(destinationWrapper, 'db')

  return () => {
    remove(headerLogo, 'dn')
    add(headerLogo, 'dib')
    remove(destinationWrapper, 'db')
    add(destinationWrapper, 'dn')
    node.remove()
  }
})

module.exports = function linkResolver({ _type, reference, url, email }) {
  switch (_type) {
    case 'internalLink':
      switch (reference._type) {
        case 'page':
          return `/${reference.slug}`
        case 'product':
          return `/products/#${reference.slug}`
      }
    case 'externalLink':
      return url
    case 'emailLink':
      return `mailto:${email}`
  }
}

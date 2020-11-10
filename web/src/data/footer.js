const client = require('../util/client.js')
const groq = require('groq')
const allBlocksToHtml = require('../util/allBlocksToHtml.js')

module.exports = async function() {
  const footer = await client.fetch(groq`*[_type == 'footer'][0] {
    menu[] {
      title,
      linkType == 'Internal' => {
        ...internalLink,
        'reference': internalLink.reference-> {
          _type,
          'slug': slug.current,
        }
      },
      linkType == 'External' => {
        ...externalLink,
      },
      linkType == 'Email' => {
        ...emailLink,
      }
    },
    newsletterSignup,
  }`)

  return footer
}

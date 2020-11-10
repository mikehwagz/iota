const client = require('../util/client.js')
const groq = require('groq')
const allBlocksToHtml = require('../util/allBlocksToHtml.js')

module.exports = async function() {
  const pages = await client.fetch(groq`*[_type == 'page'] {
    title,
    'slug': slug.current,
    'sections': content[] {
      title,
      richText,
    }
  }`)

  return pages
}

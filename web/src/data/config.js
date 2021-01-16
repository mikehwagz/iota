const client = require('../util/client.js')
const groq = require('groq')

module.exports = async function() {
  const config = await client.fetch(groq`*[_type == 'config'][0] {
    seo {
      title,
      description,
      image {
        altText,
        ...image.asset->
      },
      keywords
    }
  }`)

  return config
}

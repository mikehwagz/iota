const fs = require('fs')
const path = require('path')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const cx = require('nanoclass')
const blocksToHtml = require(`@sanity/block-content-to-html`)
const linkResolver = require('./src/util/linkResolver')
const centsToPriceNoTrailingZeros = require('./src/util/centsToPriceNoTrailingZeros')
// const imageUrlBuilder = require('@sanity/image-url')
// const client = require('./src/util/client')
// const builder = imageUrlBuilder(client)

module.exports = function(eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode('webpackAsset', async (name) => {
    const manifestData = await readFile(
      path.resolve(__dirname, 'src/templates/includes/_manifest.json'),
    )
    const manifest = JSON.parse(manifestData)

    return manifest[name]
  })

  eleventyConfig.addShortcode(
    'debug',
    (value) =>
      `<pre style="padding: 100px 0; font-size: 14px; font-family: monospace;">${JSON.stringify(
        value,
        null,
        2,
      )}</pre>`,
  )

  eleventyConfig.addFilter('href', linkResolver)

  eleventyConfig.addFilter('blocksToHtml', (blocks, props = {}) => {
    try {
      const h = blocksToHtml.h
      const serializers = {
        marks: {
          externalLink: ({ children, mark }) =>
            h(
              'a',
              {
                className: 'bb',
                href: mark.url,
                target: '_blank',
                rel: 'noopener noreferrer',
              },
              children,
            ),
          internalLink: ({ children, mark }) =>
            h(
              'a',
              {
                className: 'bb',
                href: linkResolver({
                  _type: 'internalLink',
                  reference: mark.reference,
                }),
              },
              children,
            ),
          emailLink: ({ children, mark }) =>
            h(
              'a',
              {
                className: 'bb',
                'data-router-disabled': true,
                href: linkResolver({
                  _type: 'emailLink',
                  email: mark.email,
                }),
              },
              children,
            ),
        },
      }
      return blocksToHtml({
        blocks,
        serializers,
        className: props.cx,
      })
    } catch (e) {
      console.log('blocksToHtml filter error:', e)
      return ''
    }
  })

  eleventyConfig.addFilter(
    'centsToPriceNoTrailingZeros',
    centsToPriceNoTrailingZeros,
  )

  // eleventyConfig.addShortcode('urlFor', (image, width) => {
  //   return builder
  //     .image(image)
  //     .width(width)
  //     .auto('format')
  //     .url()
  // })

  eleventyConfig.addShortcode('classNames', (...all) => cx(all))

  eleventyConfig.addPassthroughCopy({ 'src/assets/icons': '/' })
  eleventyConfig.addPassthroughCopy({ 'src/assets/images': '/assets' })
  eleventyConfig.addPassthroughCopy({ 'src/assets/videos': '/assets' })

  return {
    dir: {
      input: 'src/templates',
      data: '../data',
      includes: 'includes',
      layouts: 'layouts',
      output: 'build',
    },
  }
}

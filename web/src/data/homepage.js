const client = require('../util/client.js')
const groq = require('groq')

module.exports = async function() {
  const homepage = await client.fetch(groq`*[_type == 'homepage'][0] {
    slideshow[] {
      ...,
      _type == 'video' => {
        ...file.asset->,
        poster {
          altText,
          ...image.asset->
        }
      },
      _type == 'a11yImage' => {
        altText,
        ...image.asset->
      }
    },
    introText,
    products[]-> {
      'thumbs': content.main.thumbnailHoverSequence[] {
        ...asset->
      },
      'shopify': content.shopify {
        ...,
        variants[]->
      },
      'secret': content.secret.layouts[] {
        ...,
        _type == 'module.half' => {
          image {
            altText,
            ...image.asset->
          },
          hasPadding,
          imageAlignment
        },
        _type == 'module.message' => {
          text
        }
      },
      'title': content.main.title,
      'subtitle': content.main.subtitle,
      'slug': content.main.slug.current,
      'details': content.main.details,
      'images': content.main.images[] {
        altText,
        ...image.asset->,
      },
      'modules': content.main.modules[] {
        ...,
        _type == 'module.editorial' => {
          image {
            altText,
            ...image.asset->
          }
        },
        _type == 'module.full' => {
          image {
            altText,
            ...image.asset->
          }
        },
        _type == 'module.images' => {
          image1 {
            altText,
            ...image.asset->
          },
          image2 {
            altText,
            ...image.asset->
          }
        },
      },
      'hero': content.main.hero {
        landscape {
          mediaType,
          mediaType == 'video' => {
            video {
              ...file.asset->,
              poster {
                altText,
                ...image.asset->
              }
            },
          },
          mediaType == 'image' => {
            image {
              altText,
              ...image.asset->
            }
          }
        },
        portrait {
          mediaType,
          mediaType == 'video' => {
            video {
              ...file.asset->
            },
            poster {
              altText,
              ...image.asset->
            }
          },
          mediaType == 'image' => {
            image {
              altText,
              ...image.asset->
            }
          }
        }
      }

    }
  }`)

  return homepage
}

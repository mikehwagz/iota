import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import config from './documents/config'
import footer from './documents/footer'
import page from './documents/page'
import product from './documents/product'
import productVariant from './documents/productVariant'
import collection from './documents/collection'

import seo from './objects/seo'
import pageSection from './objects/pageSection'
import richText from './objects/richText'
import a11yImage from './objects/a11yImage'
import externalLink from './objects/externalLink'
import internalLink from './objects/internalLink'
import emailLink from './objects/emailLink'
import navLink from './objects/navLink'

const documents = [config, footer, page, product, productVariant, collection]

const objects = [
  seo,
  pageSection,
  externalLink,
  internalLink,
  emailLink,
  navLink,
  richText,
  a11yImage,
]

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([...documents, ...objects]),
})

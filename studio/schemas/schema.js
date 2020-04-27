import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import config from './documents/config'
import product from './documents/product'
import productVariant from './documents/productVariant'
import seo from './objects/seo'
import a11yImage from './objects/a11yImage'

const documents = [config, product, productVariant]
const objects = [seo, a11yImage]

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([...documents, ...objects]),
})

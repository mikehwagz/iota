import Tabs from 'sanity-plugin-tabs'

export default {
  name: 'productVariant',
  title: 'Variant',
  type: 'document',
  __experimental_actions: ['update', 'publish', 'delete'],
  fields: [
    {
      name: 'content',
      type: 'object',
      inputComponent: Tabs,
      fieldsets: [
        { name: 'main', title: 'Main' },
        { name: 'shopify', title: 'Shopify' },
      ],
      fields: [
        {
          name: 'main',
          type: 'object',
          fieldset: 'main',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
          ],
        },
        {
          name: 'shopify',
          type: 'object',
          fieldset: 'shopify',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'variantTitle',
              title: 'Variant Title',
              type: 'string',
            },
            {
              name: 'id',
              title: 'ID',
              type: 'string',
              description: 'This comes from Shopify and cannot be changed',
              readOnly: true,
              hidden: true,
            },
            {
              name: 'productId',
              title: 'Product ID',
              type: 'number',
              description: 'This comes from Shopify and cannot be changed',
              readOnly: true,
              hidden: true,
            },
            {
              name: 'variantId',
              title: 'Variant ID',
              type: 'number',
              description: 'This comes from Shopify and cannot be changed',
              readOnly: true,
              hidden: true,
            },
            {
              name: 'price',
              title: 'Price',
              type: 'string',
              description: 'This comes from Shopify and cannot be changed',
              readOnly: true,
            },
            {
              name: 'sku',
              title: 'SKU',
              type: 'string',
              description: 'This comes from Shopify and cannot be changed',
              readOnly: true,
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'content.main.title',
      media: 'mainImage',
    },
  },
}

import Tabs from 'sanity-plugin-tabs'

export default {
  name: 'product',
  title: 'Product',
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
            {
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              readOnly: true,
              description: 'This has to stay in sync with Shopify',
              options: {
                source: 'content.main.title',
                maxLength: 96,
              },
              validation: (Rule) => Rule.required(),
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
              name: 'id',
              title: 'ID',
              type: 'string',
              description: 'This comes from Shopify and cannot be changed',
              readOnly: true,
              hidden: true,
            },
            {
              name: 'deleted',
              title: 'Deleted',
              type: 'boolean',
              description:
                'When a product is deleted in Shopify, this switch will be on and you can safely delete it in Sanity once it is removed from any Collections that reference it.',
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
              name: 'defaultPrice',
              title: 'Default Price',
              type: 'string',
              description: 'This comes from Shopify and cannot be changed',
              readOnly: true,
            },
            {
              name: 'variants',
              title: 'Variants',
              type: 'array',
              of: [{ type: 'reference', to: { type: 'productVariant' } }],
            },
            {
              title: 'Product Variant',
              name: 'defaultVariant',
              type: 'object',
              description: `This information comes from Shopify and should not be modified here.`,
              fieldsets: [
                {
                  name: 'information',
                  title: 'Variant Information',
                  options: {
                    collapsible: true,
                    collapsed: true,
                  },
                },
              ],
              fields: [
                {
                  title: 'Title',
                  name: 'title',
                  readOnly: true,
                  type: 'string',
                  fieldset: 'information',
                },
                {
                  title: 'Weight in grams',
                  name: 'grams',
                  readOnly: true,
                  type: 'number',
                  fieldset: 'information',
                },
                {
                  title: 'Price',
                  name: 'price',
                  readOnly: true,
                  type: 'string',
                  fieldset: 'information',
                },
                {
                  title: 'Variant Id',
                  name: 'variantId',
                  readOnly: true,
                  type: 'number',
                  fieldset: 'information',
                },
                {
                  title: 'SKU',
                  name: 'sku',
                  readOnly: true,
                  type: 'string',
                  fieldset: 'information',
                },
                {
                  title: 'Taxable',
                  name: 'taxable',
                  readOnly: true,
                  type: 'boolean',
                  fieldset: 'information',
                },
                {
                  title: 'Inventory Policy',
                  name: 'inventoryPolicy',
                  readOnly: true,
                  type: 'string',
                  fieldset: 'information',
                },
                {
                  title: 'Inventory Quantity',
                  name: 'inventoryQuantity',
                  readOnly: true,
                  type: 'number',
                  fieldset: 'information',
                },
                {
                  title: 'Bar code',
                  name: 'barcode',
                  readOnly: true,
                  type: 'string',
                  fieldset: 'information',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'content.main.title',
      media: 'content.main.mainImage',
    },
  },
}

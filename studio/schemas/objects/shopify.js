export default {
  name: 'shopify',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      readOnly: true,
      description: 'This comes from Shopify and cannot be changed',
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
}
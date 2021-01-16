export default {
  title: 'Homepage',
  name: 'homepage',
  type: 'document',
  // __experimental_actions: ['update', 'publish'],
  fields: [
    {
      title: 'Products',
      name: 'products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    },
  ],
}

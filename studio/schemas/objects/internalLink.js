export default {
  name: 'internalLink',
  title: 'Internal Link',
  type: 'object',
  description: 'A link to another page or product on this website.',
  fields: [
    {
      title: 'Link',
      type: 'reference',
      name: 'reference',
      to: [{ type: 'product', type: 'page' }],
    },
  ],
}

export default {
  title: 'Homepage',
  name: 'homepage',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'slideshow',
      title: 'Slideshow',
      type: 'array',
      of: [{ type: 'a11yImage' }, { type: 'video' }],
    },
    {
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
      rows: 2,
    },
    {
      title: 'Products',
      name: 'products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    },
  ],
}

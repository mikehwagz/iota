export default {
  title: 'Full Width',
  name: 'module.full',
  type: 'object',
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'a11yImage',
    },
  ],
  preview: {
    select: {
      media: 'image.image',
    },
    prepare(selection) {
      return {
        ...selection,
        title: 'Full Width Image',
      }
    },
  },
}

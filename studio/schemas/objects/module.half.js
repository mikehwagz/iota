export default {
  title: 'Half Width',
  name: 'module.half',
  type: 'object',
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'a11yImage',
    },
    {
      title: 'Has padding?',
      name: 'hasPadding',
      type: 'boolean',
    },
    {
      title: 'Image Alignment',
      name: 'imageAlignment',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
      },
    },
  ],
  preview: {
    select: {
      media: 'image.image',
      imageAlignment: 'imageAlignment',
      hasPadding: 'hasPadding',
    },
    prepare({ imageAlignment, hasPadding, ...selection }) {
      return {
        ...selection,
        title: 'Half Width Image',
        subtitle: `Align: ${imageAlignment} / Padding: ${
          hasPadding ? 'yes' : 'no'
        }`,
      }
    },
  },
}

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
      title: 'Image Size',
      name: 'imageSize',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: 'Crop', value: 'cover' },
          { title: 'Fit', value: 'contain' },
        ],
      },
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
}

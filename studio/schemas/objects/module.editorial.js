export default {
  title: 'Image + Editorial',
  name: 'module.editorial',
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
      title: 'Full bleed?',
      name: 'fullBleed',
      type: 'boolean',
    },
    {
      title: 'Editorial',
      name: 'editorial',
      type: 'paragraphs',
    },
  ],
}

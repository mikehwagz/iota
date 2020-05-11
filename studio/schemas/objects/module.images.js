export default {
  title: 'Two Images',
  name: 'module.images',
  type: 'object',
  fields: [
    {
      title: 'Image 1',
      name: 'image1',
      type: 'a11yImage',
    },
    {
      title: 'Image 1 Size',
      name: 'image1Size',
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
      title: 'Image 1 has padding?',
      name: 'image1HasPadding',
      type: 'boolean',
    },
    {
      title: 'Image 2',
      name: 'image2',
      type: 'a11yImage',
    },
    {
      title: 'Image 2 Size',
      name: 'image2Size',
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
      title: 'Image 2 has padding?',
      name: 'image2HasPadding',
      type: 'boolean',
    },
  ],
}

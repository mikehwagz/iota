import React from 'react'

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
      title: 'Image 2',
      name: 'image2',
      type: 'a11yImage',
    },
  ],
  preview: {
    select: {
      media: 'image1.image',
    },
    prepare(selection) {
      return {
        ...selection,
        title: 'Two Images',
      }
    },
  },
}

export default {
  title: 'Video',
  name: 'video',
  type: 'object',
  fields: [
    {
      title: 'MP4 File',
      name: 'file',
      type: 'file',
    },
    {
      title: 'First Frame Image',
      name: 'poster',
      type: 'a11yImage',
    },
  ],
  preview: {
    select: {
      media: 'poster.image',
      subtitle: 'poster.altText',
    },
    prepare(selection) {
      return {
        ...selection,
        title: 'Video',
      }
    },
  },
}

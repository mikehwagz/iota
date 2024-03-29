export default {
  title: 'Image',
  name: 'a11yImage',
  type: 'object',
  options: {
    collapsible: false,
  },
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'image',
    },
    {
      title: 'Alt Text',
      name: 'altText',
      type: 'string',
      description:
        'A short description of the image that is important for accessibility and SEO',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      media: 'image',
      subtitle: 'altText',
    },
    prepare(selection) {
      return {
        ...selection,
        title: 'Image',
      }
    },
  },
}

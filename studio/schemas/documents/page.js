export default {
  title: 'Page',
  name: 'page',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Content',
      name: 'content',
      description:
        'If there is more than one section, titles will appear as anchor links in the sidebar',
      type: 'array',
      of: [
        {
          type: 'pageSection',
        },
      ],
    },
  ],
}

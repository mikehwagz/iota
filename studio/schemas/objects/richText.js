export default {
  title: 'Rich Text',
  name: 'richText',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading', value: 'h2' },
      ],
      lists: [],
      marks: {
        decorators: [],
        annotations: [
          {
            name: 'internalLink',
            title: 'Internal Link',
            type: 'internalLink',
          },
          {
            name: 'externalLink',
            title: 'External Link',
            type: 'externalLink',
          },
          {
            name: 'emailLink',
            title: 'Email Link',
            type: 'emailLink',
          },
        ],
      },
    },
  ],
}

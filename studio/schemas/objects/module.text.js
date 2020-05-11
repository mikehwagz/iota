export default {
  title: 'Rich Text',
  name: 'module.text',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 1', value: 'h1' },
        { title: 'Heading 2', value: 'h2' },
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

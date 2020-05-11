export default {
  name: 'paragraphs',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
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

export default {
  title: 'Message',
  name: 'module.message',
  type: 'object',
  fields: [
    {
      title: 'Text',
      name: 'text',
      type: 'string',
    },
    {
      title: 'Horizontal Alignment',
      name: 'alignmentX',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
      },
    },
    {
      title: 'Vertical Alignment',
      name: 'alignmentY',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: 'Top', value: 'top' },
          { title: 'Bottom', value: 'bottom' },
        ],
      },
    },
  ],
}

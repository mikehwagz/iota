export default {
  name: 'externalLink',
  title: 'External Link',
  type: 'object',
  description: 'A link to a different site (opens in a new tab).',
  fields: [
    {
      title: 'URL',
      type: 'url',
      name: 'url',
    },
    {
      title: 'Title',
      type: 'string',
      name: 'title',
    },
  ],
}

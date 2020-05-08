export default {
  name: 'footer',
  title: 'Footer',
  __experimental_actions: ['update', 'publish'],
  type: 'document',
  fields: [
    {
      title: 'Newsletter Signup',
      name: 'newsletterSignup',
      type: 'object',
      fields: [
        {
          title: 'Placeholder Text',
          name: 'placeholderText',
          type: 'string',
        },
        {
          title: 'Submit Button Text',
          name: 'submitButtonText',
          type: 'string',
        },
        {
          title: 'Success Message',
          description: 'The text that displays after someone signs up.',
          name: 'successMessage',
          type: 'string',
        },
      ],
    },
    {
      title: 'Footer Menu',
      name: 'menu',
      type: 'array',
      of: [{ type: 'internalLink' }, { type: 'externalLink' }],
      validation: (Rule) => Rule.max(4),
    },
  ],
}

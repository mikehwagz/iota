import ConditionalField from '../../plugins/ConditionalFieldWithParent'

export default {
  title: 'Navigation Link',
  name: 'navLink',
  type: 'object',
  fields: [
    {
      title: 'Link Text',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Link Type',
      name: 'linkType',
      type: 'string',
      options: {
        layout: 'radio',
        list: ['Internal', 'External', 'Email'],
      },
    },
    {
      name: 'internalLink',
      title: 'Internal Link',
      type: 'internalLink',
      inputComponent: ConditionalField,
      options: {
        condition: (_doc, { linkType }) => linkType === 'Internal',
      },
    },
    {
      name: 'externalLink',
      title: 'External Link',
      type: 'externalLink',
      inputComponent: ConditionalField,
      options: {
        condition: (_doc, { linkType }) => linkType === 'External',
      },
    },
    {
      name: 'emailLink',
      title: 'Email Link',
      type: 'emailLink',
      inputComponent: ConditionalField,
      options: {
        condition: (_doc, { linkType }) => linkType === 'Email',
      },
    },
  ],
}

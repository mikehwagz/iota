import React from 'react'
import { FaLink } from 'react-icons/fa'

export default {
  name: 'internalLink',
  title: 'Internal Link',
  type: 'object',
  description: 'A link to another page or product on this website.',
  blockEditor: {
    icon: () => <FaLink />,
    render: (props) => (
      <span>
        {props.children} <FaLink />
      </span>
    ),
  },
  fields: [
    {
      title: 'Link',
      type: 'reference',
      name: 'reference',
      to: [{ type: 'product', type: 'page' }],
    },
  ],
}

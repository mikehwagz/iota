import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'

export default {
  name: 'externalLink',
  title: 'External Link',
  type: 'object',
  description: 'A link to a different site (opens in a new tab).',
  blockEditor: {
    icon: () => <FaExternalLinkAlt />,
    render: (props) => (
      <span>
        {props.children} <FaExternalLinkAlt />
      </span>
    ),
  },
  fields: [
    {
      title: 'URL',
      type: 'url',
      name: 'url',
    },
  ],
}

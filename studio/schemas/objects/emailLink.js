import React from 'react'
import { FaRegEnvelope } from 'react-icons/fa'

export default {
  name: 'emailLink',
  title: 'Email Link',
  type: 'object',
  description: "A link that copies an email address to the user's clipboard.",
  blockEditor: {
    icon: () => <FaRegEnvelope />,
    render: (props) => (
      <span>
        {props.children} <FaRegEnvelope />
      </span>
    ),
  },
  fields: [
    {
      title: 'Email Address',
      type: 'email',
      name: 'email',
    },
  ],
}

import ConditionalField from '../../plugins/ConditionalField'
import React from 'react'
import Tabs from 'sanity-plugin-tabs'
import delve from 'dlv'

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  __experimental_actions: ['update', 'publish', 'delete'],
  fields: [
    {
      name: 'content',
      type: 'object',
      inputComponent: Tabs,
      fieldsets: [
        { name: 'main', title: 'Main Content' },
        { name: 'secret', title: 'Secret Content' },
        { name: 'shopify', title: 'Shopify' },
      ],
      fields: [
        {
          title: 'Main Content',
          name: 'main',
          type: 'object',
          fieldset: 'main',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'subtitle',
              title: 'Optional Subtitle',
              type: 'string',
              description: '(i.e. by Ian Loring Shiver)',
            },
            {
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              readOnly: true,
              description: 'This has to stay in sync with Shopify',
              options: {
                source: 'content.main.title',
                maxLength: 96,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'thumbnailHoverSequence',
              title: 'Thumbnail Hover Sequence',
              description: "Transparent png's only",
              type: 'array',
              of: [{ type: 'image' }],
            },
            {
              name: 'hero',
              type: 'object',
              title: 'Hero',
              fields: [
                {
                  name: 'landscape',
                  title: 'Landscape Media',
                  type: 'object',
                  fields: [
                    {
                      title: 'Media Type',
                      name: 'mediaType',
                      type: 'string',
                      options: {
                        layout: 'radio',
                        list: [
                          { title: 'Video', value: 'video' },
                          { title: 'Image', value: 'image' },
                        ],
                      },
                    },
                    {
                      title: 'Video',
                      name: 'video',
                      type: 'video',
                      inputComponent: ConditionalField,
                      options: {
                        collapsible: false,
                        condition: (doc) =>
                          delve(
                            doc,
                            'content.main.hero.landscape.mediaType',
                          ) === 'video',
                      },
                    },
                    {
                      title: 'Image',
                      name: 'image',
                      type: 'a11yImage',
                      inputComponent: ConditionalField,
                      options: {
                        collapsible: false,
                        condition: (doc) =>
                          delve(
                            doc,
                            'content.main.hero.landscape.mediaType',
                          ) === 'image',
                      },
                    },
                  ],
                },
                {
                  name: 'portrait',
                  title: 'Portrait Media',
                  type: 'object',
                  fields: [
                    {
                      title: 'Media Type',
                      name: 'mediaType',
                      type: 'string',
                      options: {
                        layout: 'radio',
                        list: [
                          { title: 'Video', value: 'video' },
                          { title: 'Image', value: 'image' },
                        ],
                      },
                    },
                    {
                      title: 'Video',
                      name: 'video',
                      type: 'video',
                      inputComponent: ConditionalField,
                      options: {
                        collapsible: false,
                        condition: (doc) =>
                          delve(doc, 'content.main.hero.portrait.mediaType') ===
                          'video',
                      },
                    },
                    {
                      title: 'Image',
                      name: 'image',
                      type: 'a11yImage',
                      inputComponent: ConditionalField,
                      options: {
                        collapsible: false,
                        condition: (doc) =>
                          delve(doc, 'content.main.hero.portrait.mediaType') ===
                          'image',
                      },
                    },
                  ],
                },
              ],
            },
            {
              title: 'Product Details',
              name: 'details',
              type: 'paragraphs',
            },
            {
              title: 'Product Images',
              name: 'images',
              type: 'array',
              of: [{ type: 'a11yImage' }],
            },
            {
              title: 'Content Modules',
              name: 'modules',
              type: 'array',
              of: [
                { type: 'module.editorial' },
                { type: 'module.full' },
                { type: 'module.images' },
                { type: 'module.text' },
              ],
            },
          ],
        },
        {
          title: 'Secret Content',
          name: 'secret',
          type: 'object',
          fieldset: 'secret',
          fields: [
            {
              title: 'Layouts',
              type: 'array',
              name: 'layouts',
              description:
                'Each layout corresponds to a letter in the corner of the screen (i.e. the second layout is revealed by dragging the O in the upper right corner)',
              of: [
                { type: 'module.half' },
                { type: 'module.full' },
                { type: 'module.message' },
              ],
              validation: (Rule) => Rule.length(4),
            },
          ],
        },
        {
          name: 'shopify',
          type: 'shopify',
          fieldset: 'shopify',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'content.main.title',
      thumb: 'content.main.thumbnailHoverSequence.0.asset.url',
    },
    prepare({ title, thumb }) {
      return {
        title,
        media: (
          <img
            src={thumb}
            alt={`${title} thumbnail`}
            style={{ objectFit: 'contain' }}
          />
        ),
      }
    },
  },
}

import blocksToPlainText from '../../util/blocksToPlainText'

export default {
  title: 'Image + Editorial',
  name: 'module.editorial',
  type: 'object',
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'a11yImage',
    },
    {
      title: 'Editorial',
      name: 'editorial',
      type: 'paragraphs',
    },
  ],
  preview: {
    select: {
      media: 'image.image',
      subtitle: 'editorial',
    },
    prepare(selection) {
      return {
        ...selection,
        title: 'Image + Editorial',
        subtitle: blocksToPlainText(selection.subtitle),
      }
    },
  },
}

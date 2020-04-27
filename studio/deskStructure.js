import S from '@sanity/desk-tool/structure-builder'
import React from 'react'
import Emoji from 'react-emoji-render'

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Global Settings')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="🌎" />)
        .child(
          S.editor()
            .title('Global Settings')
            .schemaType('config')
            .documentId('config'),
        ),
      S.listItem()
        .title('Products')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="📕" />)
        .child(S.documentTypeList('product').title('Products')),
    ])

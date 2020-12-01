import S from '@sanity/desk-tool/structure-builder'
import React from 'react'
import Emoji from 'react-emoji-render'

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Products')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="📕" />)
        .child(S.documentTypeList('product').title('Products')),
      S.listItem()
        .title('Pages')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="🗞️" />)
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .title('Settings')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="🌎" />)
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('SEO Metadata')
                .icon(() => <Emoji style={{ fontSize: 30 }} text="🔍" />)
                .child(
                  S.editor()
                    .title('SEO Metadata')
                    .schemaType('config')
                    .documentId('config'),
                ),
              S.listItem()
                .title('Footer')
                .icon(() => <Emoji style={{ fontSize: 30 }} text="👟" />)
                .child(
                  S.editor()
                    .title('Footer')
                    .schemaType('footer')
                    .documentId('footer'),
                ),
            ]),
        ),
    ])

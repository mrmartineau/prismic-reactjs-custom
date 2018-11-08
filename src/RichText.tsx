import * as React from 'react'
import { RichTextRenderer } from './RichText.renderer'
import { PrismicRichText } from './RichText.model'

interface RichTextProps {
  richText: PrismicRichText
  heading1?: React.ReactNode
  heading2?: React.ReactNode
  heading3?: React.ReactNode
  heading4?: React.ReactNode
  heading5?: React.ReactNode
  heading6?: React.ReactNode
  paragraph?: React.ReactNode
  preformatted?: React.ReactNode
  strong?: React.ReactNode
  em?: React.ReactNode
  listItem?: React.ReactNode
  oListItem?: React.ReactNode
  list?: React.ReactNode
  oList?: React.ReactNode
  image?: React.ReactNode
  embed?: React.ReactNode
  hyperlink?: React.ReactNode
  label?: React.ReactNode
  span?: React.ReactNode
  linkResolver?: React.ReactNode
  htmlSerializer?: React.ReactNode
}

export const RichText: React.SFC<RichTextProps> = props =>
  RichTextRenderer.render(
    props.richText,
    {
      heading1: props.heading1,
      heading2: props.heading2,
      heading3: props.heading3,
      heading4: props.heading4,
      heading5: props.heading5,
      heading6: props.heading6,
      paragraph: props.paragraph,
      strong: props.strong,
      em: props.em,
      listItem: props.listItem,
      oListItem: props.oListItem,
      list: props.list,
      oList: props.oList,
      image: props.image,
      embed: props.embed,
      hyperlink: props.hyperlink,
      label: props.label,
      span: props.span,
    },
    props.linkResolver,
    props.htmlSerializer
  )

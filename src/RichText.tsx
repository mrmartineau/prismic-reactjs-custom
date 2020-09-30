import React, { FC, ReactNode } from 'react'
import { RichTextRenderer } from './RichText.renderer'
import { PrismicRichText } from './RichText.model'

export interface RichTextProps {
  richText: PrismicRichText
  heading1?: ReactNode
  heading2?: ReactNode
  heading3?: ReactNode
  heading4?: ReactNode
  heading5?: ReactNode
  heading6?: ReactNode
  paragraph?: ReactNode
  preformatted?: ReactNode
  strong?: ReactNode
  em?: ReactNode
  listItem?: ReactNode
  oListItem?: ReactNode
  list?: ReactNode
  oList?: ReactNode
  image?: ReactNode
  embed?: ReactNode
  hyperlink?: ReactNode
  label?: ReactNode
  span?: ReactNode
  linkResolver?: ReactNode
  htmlSerializer?: ReactNode
}

export const RichText: FC<RichTextProps> = (props) =>
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

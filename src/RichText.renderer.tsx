// this file has been lifted (and modified) directly from https://github.com/prismicio/prismic-reactjs/blob/master/src/richtext.js
import * as React from 'react'
import { Elements, asText, serialize as PRserialize } from 'prismic-richtext'
import { Link as LinkHelper } from 'prismic-helpers'
import { PrismicRichText } from './RichText.model'

const chooseElement = (
  standardTag: string,
  element: any,
  children: any,
  index: number,
  CustomElement?: React.ReactType
) => {
  if (CustomElement) {
    return <CustomElement key={index}>{children}</CustomElement>
  }
  return serializeStandardTag(standardTag, element, children, index)
}

interface SerializeOptions {
  heading1?: React.ReactType
  heading2?: React.ReactType
  heading3?: React.ReactType
  heading4?: React.ReactType
  heading5?: React.ReactType
  heading6?: React.ReactType
  paragraph?: React.ReactType
  preformatted?: React.ReactType
  strong?: React.ReactType
  em?: React.ReactType
  listItem?: React.ReactType
  oListItem?: React.ReactType
  list?: React.ReactType
  oList?: React.ReactType
  image?: React.ReactType
  embed?: React.ReactType
  hyperlink?: React.ReactType
  label?: React.ReactType
  span?: React.ReactType
}

function serialize(
  options: SerializeOptions,
  linkResolver: any,
  type: string,
  element: any,
  content: any,
  children: React.ReactNode,
  index: number
) {
  const opts = Object.assign({}, options)
  switch (type) {
    case Elements.heading1:
      return chooseElement('h1', element, children, index, opts.heading1)
    case Elements.heading2:
      return chooseElement('h2', element, children, index, opts.heading2)
    case Elements.heading3:
      return chooseElement('h3', element, children, index, opts.heading3)
    case Elements.heading4:
      return chooseElement('h4', element, children, index, opts.heading4)
    case Elements.heading5:
      return chooseElement('h5', element, children, index, opts.heading5)
    case Elements.heading6:
      return chooseElement('h6', element, children, index, opts.heading6)
    case Elements.paragraph:
      return chooseElement('p', element, children, index, opts.paragraph)
    case Elements.preformatted:
      return chooseElement('pre', element, children, index, opts.preformatted)
    case Elements.strong:
      return chooseElement('strong', element, children, index, opts.strong)
    case Elements.em:
      return chooseElement('em', element, children, index, opts.em)
    case Elements.listItem:
      return chooseElement('li', element, children, index, opts.listItem)
    case Elements.oListItem:
      return chooseElement('li', element, children, index, opts.oListItem)
    case Elements.list:
      return chooseElement('ul', element, children, index, opts.list)
    case Elements.oList:
      return chooseElement('ol', element, children, index, opts.oList)
    case Elements.image:
      return serializeImage(linkResolver, element, index, opts.image)
    case Elements.embed:
      return serializeEmbed(element, index, opts.embed)
    case Elements.hyperlink:
      return serializeHyperlink(
        linkResolver,
        element,
        children,
        index,
        opts.hyperlink
      )
    case Elements.label:
      return serializeLabel(element, children, index, opts.label)
    case Elements.span:
      return serializeSpan(content)
    default:
      return null
  }
}

function propsWithUniqueKey(props: any, key: number) {
  return { ...(props || {}), key }
}

function serializeStandardTag(
  tag: any,
  element: any,
  children: React.ReactNode,
  key: number
) {
  const props = element.label ? { className: element.label } : {}
  return React.createElement(tag, propsWithUniqueKey(props, key), children)
}

function serializeHyperlink(
  linkResolver: any,
  element: any,
  children: React.ReactNode,
  key: number,
  CustomLink?: React.ReactType
) {
  const targetAttr = element.data.target ? { target: element.data.target } : {}
  const relAttr = element.data.target ? { rel: 'noopener' } : {}
  const props = {
    href: LinkHelper.url(element.data, linkResolver),
    ...targetAttr,
    ...relAttr,
  }

  if (CustomLink) {
    return (
      <CustomLink key={key} {...props}>
        {children}
      </CustomLink>
    )
  }
  return React.createElement('a', propsWithUniqueKey(props, key), children)
}

function serializeLabel(
  element: any,
  children: React.ReactNode,
  key: number,
  CustomLabel?: React.ReactType
) {
  const props = element.data ? { className: element.data.label } : {}
  if (CustomLabel) {
    return (
      <CustomLabel key={key} {...props}>
        {children}
      </CustomLabel>
    )
  }
  return React.createElement('span', propsWithUniqueKey(props, key), children)
}

function serializeSpan(content: string) {
  if (content) {
    return content.split('\n').reduce((acc, p) => {
      if (acc.length === 0) {
        return [p]
      } else {
        const brIndex = (acc.length + 1) / 2 - 1
        const br = React.createElement('br', propsWithUniqueKey({}, brIndex))
        return acc.concat([br, p])
      }
    }, [])
  } else {
    return null
  }
}

function serializeImage(
  linkResolver: any,
  element: any,
  key: number,
  CustomImage?: React.ReactType
) {
  const linkUrl = element.linkTo
    ? LinkHelper.url(element.linkTo, linkResolver)
    : null
  const linkTarget =
    element.linkTo && element.linkTo.target
      ? { target: element.linkTo.target }
      : {}
  const relAttr = linkTarget.target ? { rel: 'noopener' } : {}
  let img
  if (CustomImage) {
    img = <CustomImage src={element.url} alt={element.alt || ''} />
  } else {
    img = React.createElement('img', {
      src: element.url,
      alt: element.alt || '',
    })
  }

  return React.createElement(
    'p',
    propsWithUniqueKey(
      { className: [element.label || '', 'block-img'].join(' ') },
      key
    ),
    linkUrl
      ? React.createElement(
          'a',
          { href: linkUrl, ...linkTarget, ...relAttr },
          img
        )
      : img
  )
}

function serializeEmbed(
  element: any,
  key: number,
  CustomEmbed: React.ReactType
) {
  const props = {
    'data-oembed': element.oembed.embed_url,
    'data-oembed-type': element.oembed.type,
    'data-oembed-provider': element.oembed.provider_name,
    ...(element.label ? { className: element.label } : {}),
  }

  let embedHtml

  if (CustomEmbed) {
    embedHtml = <CustomEmbed key={key} />
  } else {
    embedHtml = React.createElement('div', {
      dangerouslySetInnerHTML: { __html: element.oembed.html },
    })
  }

  return React.createElement('div', propsWithUniqueKey(props, key), embedHtml)
}

export const RichTextRenderer = {
  asText: (richText: PrismicRichText) => {
    return asText(richText)
  },
  render: (
    richText: PrismicRichText,
    options?: any,
    linkResolver?: any,
    htmlSerializer?: any
  ) => {
    const children = PRserialize(
      richText,
      serialize.bind(null, options, linkResolver),
      htmlSerializer
    )
    return React.createElement(React.Fragment, {}, children)
  },
  Elements,
}
